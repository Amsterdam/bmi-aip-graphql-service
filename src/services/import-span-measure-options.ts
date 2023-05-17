import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { SingleBar } from 'cli-progress';
import { ConsoleService } from 'nestjs-console';
import { ConfigService } from '@nestjs/config';
import * as xlsx from 'xlsx';
import { WorkSheet } from 'xlsx';
import { SpanMeasureItemType } from 'src/schema/span-installation/types/span-measure-item-type';
import { newId } from 'src/utils/newId';

import { SpanMeasureItemOption } from '../schema/span-installation/models/span-measure-item-option.model';
import { SpanMeasureOption } from '../schema/span-installation/models/span-measure-option.model';
import { SpanDecompositionType } from '../schema/span-installation/types/span-decomposition-type';

import {
	OVSSpanMeasureExcelRowObject,
	BestekspostenExcelRowObject,
	MNummersExcelRowObject,
} from './types/excelRowObject';
import { MeasureItemOption } from './types/MeasureItemOption';
import { MeasureOption } from './types/MeasureOption';

@Injectable()
export class ImportSpanMeasureOptions {
	private static CLI_COMMAND = 'ovs:import-measure-options';

	progressBar = new SingleBar({});

	progressTracker = 0;

	private jsonDataFilePath = 'src/schema/span-installation/types/data/normalized-data-measures.json';

	private jsonData: { spanMeasureOptions: SpanMeasureOption[]; spanMeasureItemOptions: SpanMeasureItemOption[] };

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private configService: ConfigService,
	) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: ImportSpanMeasureOptions.CLI_COMMAND,
				description: 'description',
			},
			this.importOVSMeasures.bind(this),
			cli,
		);
	}

	private fetchMatrixFromSheet(workSheet) {
		// get first sheet
		this.logger.debug(`Mapping file from ${workSheet} sheet`);
		const minRow = 2;
		let data: OVSSpanMeasureExcelRowObject[] = xlsx.utils.sheet_to_json<OVSSpanMeasureExcelRowObject>(workSheet, {
			range: 3,
		});
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		return data;
	}

	private parseBestekpostRow(
		bestekpostObj: BestekspostenExcelRowObject,
		knownSpecificationItem?: SpanMeasureItemOption,
	) {
		return {
			id: knownSpecificationItem ? knownSpecificationItem.id : newId(),
			unit: bestekpostObj['Eenh.'],
			itemType: SpanMeasureItemType.specificationItem,
			description: bestekpostObj['Postomschrijving (beknopt)'],
			referenceNumber: bestekpostObj['Bestekspostnr.'].toString(),
		};
	}

	private parseMNummersRow(materialenObj: MNummersExcelRowObject, knownMaterial?: SpanMeasureItemOption) {
		return {
			id: knownMaterial ? knownMaterial.id : newId(),
			unit: 'Stuk',
			itemType: SpanMeasureItemType.material,
			description: materialenObj['Voorlopige benaming'],
			referenceNumber: materialenObj['M-nummer'].toString(),
		};
	}

	private fetchBestekpostenFromSheet(workSheet, knownSpanMeasureItems?: SpanMeasureItemOption[]) {
		const minRow = 0;
		let data: BestekspostenExcelRowObject[] = xlsx.utils.sheet_to_json<BestekspostenExcelRowObject>(workSheet);
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		const formattedData = data.map((row) => {
			const knownSpecificationItem = knownSpanMeasureItems.find(
				(knownItem) => knownItem.referenceNumber === row['Bestekspostnr.'].toString(),
			);

			return this.parseBestekpostRow(row, knownSpecificationItem);
		});

		return formattedData;
	}

	private fetchMaterialenFromSheet(workSheet, knownSpanMeasureItems?: SpanMeasureItemOption[]) {
		const minRow = 0;
		let data: MNummersExcelRowObject[] = xlsx.utils.sheet_to_json<MNummersExcelRowObject>(workSheet, { range: 1 });
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		const formattedData = data.map((row) => {
			const knownMaterial = knownSpanMeasureItems.find(
				(knownItem) => knownItem.referenceNumber === row['M-nummer'].toString(),
			);

			return this.parseMNummersRow(row, knownMaterial);
		});

		return formattedData;
	}

	private async getFile(): Promise<{ [sheet: string]: WorkSheet }> {
		const filePath: string =
			this.configService.get<string>('APP_DIR') +
			this.configService.get<string>('DOC_DIR') +
			this.configService.get<string>('READ_FILE_OVS_MEASURES');
		// read from xlsx file
		const maxRow = 9628;
		const workbook = xlsx.readFile(`${filePath}`, { sheetRows: maxRow });

		if (!this.sheetStructureIsValid(workbook.Sheets)) {
			this.logger.error('Invalid sheet structure');
			throw new Error('Invalid sheet structure');
		}

		return workbook.Sheets;
	}

	private sheetStructureIsValid(sheets: xlsx.WorkBook['Sheets']) {
		return sheets.Matrix && sheets.Besteksposten && sheets['M-nummers'];
	}

	private async importOVSMeasures() {
		this.progressBar.start(100, 0);

		this.jsonData = JSON.parse(fs.readFileSync(this.jsonDataFilePath, 'utf8'));
		const file = await this.getFile();

		const oVSSpanMeasureExcelRowObjectList: OVSSpanMeasureExcelRowObject[] = this.fetchMatrixFromSheet(file.Matrix);

		const fetchBestekposten = this.fetchBestekpostenFromSheet(
			file.Besteksposten,
			this.jsonData.spanMeasureItemOptions,
		);
		const fetchMaterialen = this.fetchMaterialenFromSheet(file['M-nummers'], this.jsonData.spanMeasureItemOptions);

		const normalizedData = await this.normalize(
			oVSSpanMeasureExcelRowObjectList,
			fetchMaterialen,
			fetchBestekposten,
		);

		this.progressBar.stop();

		this.logger.log('');
		this.logger.log(`Completed importing ${Object.keys(normalizedData).length} measures and options`);
	}

	private mapDecompositionType(input: string): string {
		switch (input) {
			case 'Aansluitkast':
				return SpanDecompositionType.spanJunctionBox;
				break;
			case 'Mast':
				return SpanDecompositionType.spanSupportSystemMast;
				break;
			case 'Knoop':
				return SpanDecompositionType.spanSupportSystemNode;
				break;
			case 'Gevel':
				return SpanDecompositionType.spanSupportSystemFacade;
				break;
			case 'Spandraad':
				return SpanDecompositionType.spanSupportSystemTensionWire;
				break;
			case 'Armatuur':
				return SpanDecompositionType.spanLuminaire;
				break;
		}
	}

	private mapItemType(input: string): string {
		switch (input) {
			case 'Aansluitkast':
				return SpanMeasureItemType.material;
				break;
		}
	}

	public async saveToFile(normalizedData: Record<string, any>) {
		const filePath = path.resolve(
			process.cwd(),
			'src/schema/span-installation/types/data/normalized-data-measures.json',
		);
		this.logger.verbose('Writing JSON to file: ' + filePath);

		fs.writeFileSync(filePath, JSON.stringify(normalizedData), {
			encoding: 'utf-8',
		});
	}

	public formatMaterial(element: string): MeasureItemOption {
		const material = {
			id: newId(),
			itemType: SpanMeasureItemType.material,
			description: element ?? '',
		};

		return material;
	}

	public formatSpecificationItem(element: string): MeasureItemOption {
		const specificationItem = {
			id: newId(),
			itemType: SpanMeasureItemType.specificationItem,
			description: element ?? '',
		};

		return specificationItem;
	}

	public fetchFromList(key, list, itemType: SpanMeasureItemType) {
		const foundItem = list.find((item) => {
			key = key.replace(/\s/g, ''); // sanitize lookup key
			return item.referenceNumber === key;
		});

		if (key && !foundItem) {
			this.logger.warn('Matrix contains reference number that is not recognized: ' + key);
			//throw new Error('Matrix contains reference number that is not recognized');
		}

		return foundItem;
	}

	public parseSpecificationItems(key: string, list: any): MeasureItemOption[] {
		if (!key) {
			return [];
		}

		const array = key.toString().split(',');
		return array.reduce((acc, item) => {
			const itemsSplitByComma = item.toString().split(',');
			const foundItem = this.fetchFromList(itemsSplitByComma[0], list, SpanMeasureItemType.specificationItem);

			if (!foundItem) {
				return acc;
			}

			return [...acc, foundItem];
		}, []);
	}

	public parseMaterials(key: string, list: any): MeasureItemOption[] {
		if (!key) {
			return [];
		}

		const itemsSplitByNewline = key.toString().split('\n');
		return itemsSplitByNewline.reduce((acc, item) => {
			const itemsSplitBySpace = item.toString().split(' '); // reference number is the first 'word' in the title
			const foundItem = this.fetchFromList(itemsSplitBySpace[0], list, SpanMeasureItemType.specificationItem);

			if (!foundItem) {
				return acc;
			}

			return [...acc, foundItem];
		}, []);
	}

	private containsMeasureItem(measureOption: MeasureOption, measureItemOption: MeasureItemOption): boolean {
		return measureOption.measureItems.some((item) => {
			return item.description == measureItemOption.description;
		});
	}

	public async normalize(
		oVSExcelRowObjectList: OVSSpanMeasureExcelRowObject[],
		materials: object[],
		bestekposten: object[],
	): Promise<Record<string, any>> {
		const measureOptions = {};
		let lastReadDecompositionType = '';

		oVSExcelRowObjectList.forEach((element: OVSSpanMeasureExcelRowObject, index) => {
			const foundMeasureOption = this.jsonData.spanMeasureOptions.find((item) => {
				return item.description == element.Maatregelen;
			});

			if (element.Maatregelen) {
				lastReadDecompositionType = element.Onderdelen;
			}

			const item = {
				id: foundMeasureOption ? foundMeasureOption.id : newId(),
				description: element.Maatregelen,
				decompositionType: this.mapDecompositionType(lastReadDecompositionType),
				measureItems: [
					...this.parseSpecificationItems(element.Besteksposten, bestekposten),
					...this.parseMaterials(element['Materiaal uit (M)agazijn'], materials),
				],
			};

			measureOptions[item.description] = item;
		});

		// Remap object with named keys to array
		const measureOptionsArray = Array.from(Object.values(measureOptions));
		const measureItemOptions = [...materials, ...bestekposten];

		const normalizedData = {
			spanMeasureOptions: measureOptionsArray,
			spanMeasureItemOptions: measureItemOptions,
		};

		await this.saveToFile(normalizedData);

		return normalizedData;
	}
}
