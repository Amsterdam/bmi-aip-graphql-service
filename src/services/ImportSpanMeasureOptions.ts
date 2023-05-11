import { Injectable, Logger } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { SingleBar } from 'cli-progress';
import { ConsoleService } from 'nestjs-console';
import { ConfigService } from '@nestjs/config';
import * as xlsx from 'xlsx';
import { WorkSheet } from 'xlsx';
import { newId } from 'src/utils/newId';

import { SpanMeasureOptionRepository } from '../schema/span-installation/span-measure-option.repository';
import { SpanMeasureItemType } from '../schema/span-installation/types/span-measure-item-type';
import { SpanMeasureOption } from '../schema/span-installation/models/span-measure-option.model';

import { NormalizeOVSMeasureData } from './NormalizeOVSMeasureData';
import {
	OVSSpanMeasureExcelRowObject,
	BestekspostenExcelRowObject,
	MNummersExcelRowObject,
} from './types/excelRowObject';

@Injectable()
export class ImportSpanMeasureOptions {
	private static CLI_COMMAND = 'ovs:import-measure-options';

	private static DEBUG = true;

	private graphqlClient: GraphQLClient;

	progressBar = new SingleBar({});

	progressTracker = 0;

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private configService: ConfigService,
		private normalizeOVSMeasureData: NormalizeOVSMeasureData,
		private spanMeasureOptionRepository: SpanMeasureOptionRepository,
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

	private fetchMatrixFromSheet(workSheet) {
		// get first sheet
		this.logger.debug(`Mapping file from ${workSheet} sheet`);
		const minRow = 2;
		let data: OVSSpanMeasureExcelRowObject[] = xlsx.utils.sheet_to_json<OVSSpanMeasureExcelRowObject>(workSheet);
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		return data;
	}

	private parseBestekpostRow(bestekpostObj: BestekspostenExcelRowObject) {
		return {
			id: newId(),
			unit: bestekpostObj['Eenh.'],
			itemType: SpanMeasureItemType.specificationItem,
			description: bestekpostObj['Postomschrijving (beknopt)'],
			referenceNumber: bestekpostObj['Bestekspostnr.'].toString(),
		};
	}

	private parseMNummersRow(materialenObj: MNummersExcelRowObject) {
		return {
			id: newId(),
			unit: 'Stuk',
			itemType: SpanMeasureItemType.material,
			description: materialenObj['Voorlopige benaming'],
			referenceNumber: materialenObj['M-nummer'].toString(),
		};
	}

	private fetchBestekpostenFromSheet(workSheet) {
		const minRow = 0;
		let data: BestekspostenExcelRowObject[] = xlsx.utils.sheet_to_json<BestekspostenExcelRowObject>(workSheet);
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		const formattedData = data.map((row) => {
			return this.parseBestekpostRow(row);
		});

		return formattedData;
	}

	private fetchMaterialenFromSheet(workSheet) {
		const minRow = 0;
		let data: MNummersExcelRowObject[] = xlsx.utils.sheet_to_json<MNummersExcelRowObject>(workSheet);
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		const formattedData = data.map((row) => {
			return this.parseMNummersRow(row);
		});

		return formattedData;
	}

	private async importOVSMeasures() {
		this.progressBar.start(100, 0);
		const file = await this.getFile();

		const oVSSpanMeasureExcelRowObjectList: OVSSpanMeasureExcelRowObject[] = this.fetchMatrixFromSheet(file.Matrix);

		const fetchBestekposten = this.fetchBestekpostenFromSheet(file.Besteksposten);
		const fetchMaterialen = this.fetchMaterialenFromSheet(file['M-nummers']);

		const normalizedData = await this.normalizeOVSMeasureData.normalize(
			oVSSpanMeasureExcelRowObjectList,
			fetchMaterialen,
			fetchBestekposten,
		);

		this.saveToDb(normalizedData);

		this.progressBar.stop();

		this.logger.log('');
		this.logger.log(`Completed importing ${Object.keys(normalizedData).length} measures and options`);
	}

	public async saveToDb(input: { spanMeasureOptions: SpanMeasureOption[]; spanMeasureItemOptions: object[] }) {
		input.spanMeasureOptions.map(async (item) => {
			await this.spanMeasureOptionRepository.createSpanMeasureOption({
				description: item.description,
				decompositionType: item.decompositionType,
				referenceNumber: item.referenceNumber,
			});

			// item.measureItems.map((itemOption) => {
			// 	this.spanMeasureOptionRepository.createSpanMeasureItemOption({
			// 		description: itemOption['description'],
			// 		referenceNumber: itemOption['referenceNumber'],
			// 		unitOfMeasurement: itemOption['unit'],
			// 		itemType: itemOption['itemType'],
			// 		spanMeasureOptionId: record.id
			// 	});
			// });
		});
	}
}
