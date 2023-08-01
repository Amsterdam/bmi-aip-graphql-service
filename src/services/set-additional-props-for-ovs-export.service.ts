import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import { ConfigService } from '@nestjs/config';
import PQueue from 'p-queue';
import * as xlsx from 'xlsx';
import { SingleBar } from 'cli-progress';

import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';
import { AdditionalPropsForOVSExportInput } from '../schema/span-installation/dto/additional-props-for-ovs-export.input';

import { ExcelRowObject, NormalizedInstallationFromExcel } from './types/excelRowObject';
import { NormalizeOVSImportData } from './NormalizeOVSImportData';

/**
 * npm run console ovs:additional-props-for-ovs-export
 */
@Injectable()
export class SetAdditionalPropsForOVSExportService {
	private static CLI_COMMAND = 'ovs:set-additional-props-for-ovs-export';

	private static DEBUG = true;

	private graphqlClient: GraphQLClient;

	private report: {
		file: string;
		success: string[];
		failures: {
			error: string;
			input: Partial<AdditionalPropsForOVSExportInput>;
		}[];
	} = {
		file: '',
		success: [],
		failures: [],
	};

	progressBar = new SingleBar({});

	progressTracker = 0;

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private configService: ConfigService,
		private readonly externalAIPGraphQLRepository: ExternalAIPGraphQLRepository,
		private normalizeOVSImportData: NormalizeOVSImportData,
	) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: SetAdditionalPropsForOVSExportService.CLI_COMMAND,
				description: 'set additional props for ovs export',
			},
			this.run.bind(this),
			cli,
		);

		this.graphqlClient = new GraphQLClient(this.configService.get<string>('GRAPHQL_URL'), {
			headers: {
				Authorization: 'Bearer ' + this.configService.get<string>('AUTH_TOKEN'),
			},
		});
	}

	async getFile(): Promise<ExcelRowObject[]> {
		const filePath: string =
			this.configService.get<string>('APP_DIR') +
			this.configService.get<string>('DOC_DIR') +
			this.configService.get<string>('READ_FILE');
		// read from xlsx file
		const maxRow = 9628;

		const workbook = xlsx.readFile(`${filePath}`, { sheetRows: maxRow });
		const workSheet = workbook.Sheets[workbook.SheetNames[1]];
		// get first sheet
		this.logger.debug(`Mapping file from ${workSheet} sheet`);
		const minRow = 2;
		let data: ExcelRowObject[] = xlsx.utils.sheet_to_json(workSheet);
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		return data;
	}

	private async setAdditionalPropsForOVSExport(installation: NormalizedInstallationFromExcel): Promise<void> {
		try {
			await this.externalAIPGraphQLRepository.setAdditionalPropsForOVSExport({
				installationGroup: installation.id,
				source: installation,
			});

			this.report.success.push(`${installation.id}`);
		} catch (err) {
			this.logger.debug('Failed to update ovs decomposition', err.message, installation);
			this.report.failures.push({
				error: `Failed to set additional ovs props, error: ${err.message}`,
				input: {
					installationGroup: installation.id,
					source: installation,
				},
			});
		}
	}

	private async run() {
		this.logger.verbose(`Starting file migration...`);
		const excelRowObjectList: ExcelRowObject[] = await this.getFile();
		const normalizedData = await this.normalizeOVSImportData.normalizeSpanInstallationData(excelRowObjectList);

		const queue = new PQueue({ concurrency: 10 });

		Object.keys(normalizedData).forEach((key) => {
			queue.add(() => this.setAdditionalPropsForOVSExport(normalizedData[key]));
		});
		await queue.onIdle();

		this.report.file = this.configService.get<string>('READ_FILE');

		fs.writeFileSync(
			path.resolve(process.cwd(), `cc_report_${new Date().toISOString()}.json`),
			JSON.stringify(this.report),
			{
				encoding: 'utf-8',
			},
		);
		this.progressBar.stop();

		this.logger.log('');
		this.logger.log(`Completed importing ${Object.keys(normalizedData).length} installations`);
	}
}
