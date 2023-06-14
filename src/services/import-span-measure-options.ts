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

	private forcedRewrite = false; // If true, generates the .json from scratch even if an older one exists

	private jsonData: { spanMeasureOptions: SpanMeasureOption[]; spanMeasureItemOptions: SpanMeasureItemOption[] };

	private lastReadDecompositionType = '';

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

	private getMatrixFromSheet(workSheet) {
		// Note: the min rows and ranges defined here are based on the Excel file '2023-03-28 Maatregelen matrix v0.6_bk 20230613.xlsx'
		// This file contains some comments and other data in the first rows, so we need to skip those

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

	private rowIsDescriptiveHeader(row: { 'Eenh.': string }) {
		// Some rows in the bestekposten sheet are merely heading rows, and should be ignored
		if (row['Eenh.']) {
			return false;
		}

		return true;
	}

	private parseMNummersRow(materialenObj: MNummersExcelRowObject, knownMaterial?: SpanMeasureItemOption) {
		return {
			id: knownMaterial ? knownMaterial.id : newId(),
			unit: materialenObj['Eenh.'],
			itemType: SpanMeasureItemType.material,
			description: materialenObj['Omschrijving artikel'],
			referenceNumber: materialenObj['M-nummer'].toString(),
		};
	}

	private getBestekpostenFromSheet(workSheet, knownSpanMeasureItems?: SpanMeasureItemOption[]) {
		const data: BestekspostenExcelRowObject[] = xlsx.utils.sheet_to_json<BestekspostenExcelRowObject>(workSheet);

		return data
			.filter((row) => !this.rowIsDescriptiveHeader(row))
			.map((row) => {
				return this.parseBestekpostRow(
					row,
					knownSpanMeasureItems.find(
						(knownItem) => knownItem.referenceNumber === row['Bestekspostnr.'].toString(),
					),
				);
			});
	}

	private getMaterialenFromSheet(workSheet, knownSpanMeasureItems?: SpanMeasureItemOption[]) {
		// Note: the ranges defined here is based on the Excel file '2023-03-28 Maatregelen matrix v0.6_bk 20230613.xlsx'
		// This file contains some comments and other data in the first rows, so we need to skip those to correctly define the columns

		const data: MNummersExcelRowObject[] = xlsx.utils.sheet_to_json<MNummersExcelRowObject>(workSheet, {
			range: 0,
		});

		return data.map((row) => {
			return this.parseMNummersRow(
				row,
				knownSpanMeasureItems.find((knownItem) => knownItem.referenceNumber === row['M-nummer'].toString()),
			);
		});
	}

	private async getFile(): Promise<{ [sheet: string]: WorkSheet }> {
		const filePath: string =
			this.configService.get<string>('APP_DIR') +
			this.configService.get<string>('DOC_DIR') +
			this.configService.get<string>('READ_FILE_OVS_MEASURES');
		// read from xlsx file
		const workbook = xlsx.readFile(`${filePath}`);

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
		if (this.forcedRewrite) {
			this.jsonData.spanMeasureOptions = [];
			this.jsonData.spanMeasureItemOptions = [];
		}

		const file = await this.getFile();

		const normalizedData = await this.normalize(
			this.getMatrixFromSheet(file.Matrix),
			this.getMaterialenFromSheet(file['M-nummers'], this.jsonData.spanMeasureItemOptions),
			this.getBestekpostenFromSheet(file.Besteksposten, this.jsonData.spanMeasureItemOptions),
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
		return {
			id: newId(),
			itemType: SpanMeasureItemType.material,
			description: element ?? '',
		};
	}

	public formatSpecificationItem(element: string): MeasureItemOption {
		return {
			id: newId(),
			itemType: SpanMeasureItemType.specificationItem,
			description: element ?? '',
		};
	}

	public getFromList(key, list, itemType: SpanMeasureItemType) {
		const foundItem = list.find((item) => {
			key = key.replace(/\s/g, ''); // sanitize lookup key
			return item.referenceNumber === key;
		});

		if (key && !foundItem) {
			this.logger.warn(
				'Matrix contains reference number that is not found in sheet Bestekposten or M-nummers: ' + key,
			);
		}

		return foundItem;
	}

	public parseSpecificationItems(key: string, list: any): MeasureItemOption[] {
		if (!key) {
			return [];
		}

		return key
			.toString()
			.split(',')
			.reduce((acc, item) => {
				const itemsSplitByComma = item.toString().split(',');
				const foundItem = this.getFromList(itemsSplitByComma[0], list, SpanMeasureItemType.specificationItem);

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
			// Reference number is the first 'word' in the title
			const foundItem = this.getFromList(
				item.toString().split(' ')[0],
				list,
				SpanMeasureItemType.specificationItem,
			);

			if (!foundItem) {
				return acc;
			}

			return [...acc, foundItem];
		}, []);
	}

	private containsMeasureItem(measureOption: MeasureOption, measureItemOption: MeasureItemOption): boolean {
		return measureOption.measureItems.some((item) => item.description == measureItemOption.description);
	}

	public async normalize(
		OVSExcelRowObjectList: OVSSpanMeasureExcelRowObject[],
		materials: object[],
		bestekposten: object[],
	): Promise<Record<string, any>> {
		const measureOptions = {};

		this.jsonData.spanMeasureOptions.map((item) => {
			measureOptions[item.description] = item;
		});

		OVSExcelRowObjectList.forEach((element: OVSSpanMeasureExcelRowObject, index) => {
			const foundMeasureOption = this.jsonData.spanMeasureOptions.find(
				(item) => item.description == element.Maatregelen,
			);

			if (element.Onderdelen) this.lastReadDecompositionType = element.Onderdelen;

			const optionFormatted = {
				id: foundMeasureOption ? foundMeasureOption.id : newId(),
				description: element.Maatregelen,
				decompositionType: this.mapDecompositionType(this.lastReadDecompositionType),
				measureItems: [
					...this.parseSpecificationItems(element.Besteksposten, bestekposten),
					...this.parseMaterials(element['Materiaal uit (M)agazijn'], materials),
				],
			};

			if (!measureOptions[optionFormatted.description]) {
				measureOptions[optionFormatted.description] = optionFormatted;
			} else {
				optionFormatted.measureItems.map((measureItem) => {
					const existingItem = measureOptions[optionFormatted.description].measureItems.find(
						(existing) => existing.id === measureItem.id,
					);
					if (!existingItem) {
						measureOptions[optionFormatted.description].measureItems.push(measureItem);
					}
				});
			}
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
