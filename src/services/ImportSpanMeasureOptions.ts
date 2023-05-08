import { Injectable, Logger } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { SingleBar } from 'cli-progress';
import { ConsoleService } from 'nestjs-console';
import { ConfigService } from '@nestjs/config';
import * as xlsx from 'xlsx';

import { NormalizeOVSMeasureData } from './NormalizeOVSMeasureData';
import { OVSSpanMeasureExcelRowObject } from './types/excelRowObject';

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

	private async getFile(): Promise<OVSSpanMeasureExcelRowObject[]> {
		const filePath: string =
			this.configService.get<string>('APP_DIR') +
			this.configService.get<string>('DOC_DIR') +
			this.configService.get<string>('READ_FILE_OVS_MEASURES');
		// read from xlsx file
		const maxRow = 9628;
		const workbook = xlsx.readFile(`${filePath}`, { sheetRows: maxRow });

		const workSheet = workbook.Sheets[workbook.SheetNames[0]];
		// get first sheet
		this.logger.debug(`Mapping file from ${workSheet} sheet`);
		const minRow = 2;
		let data: OVSSpanMeasureExcelRowObject[] = xlsx.utils.sheet_to_json<OVSSpanMeasureExcelRowObject>(workSheet);
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		return data;
	}

	private async importOVSMeasures() {
		this.progressBar.start(100, 0);
		const oVSSpanMeasureExcelRowObjectList: OVSSpanMeasureExcelRowObject[] = await this.getFile();
		const normalizedData = await this.normalizeOVSMeasureData.normalize(oVSSpanMeasureExcelRowObjectList);

		this.progressBar.stop();

		this.logger.log('');
		this.logger.log(`Completed importing ${Object.keys(normalizedData).length} installations`);
	}
}
