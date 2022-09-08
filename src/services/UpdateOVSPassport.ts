import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { SingleBar } from 'cli-progress';
import { ConsoleService } from 'nestjs-console';
import { ConfigService } from '@nestjs/config';
import * as xlsx from 'xlsx';
import PQueue from 'p-queue';

import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';
import { UpdateObjectInput } from '../schema/object/dto/update-object.input';

import { NormalizeOVSImportData } from './NormalizeOVSImportData';
import { ExcelRowObject, NormalizedInstallationFromExcel } from './types/excelRowObject';

@Injectable()
export class UpdateOVSPassport {
	private static CLI_COMMAND = 'ovs:passportUpdate';

	private static DEBUG = true;

	private graphqlClient: GraphQLClient;

	private report: {
		file: string;
		success: string[];
		failures: {
			error: string;
			input: Partial<UpdateObjectInput>;
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
		private normalizeOVSImportData: NormalizeOVSImportData,
		private readonly externalAIPGraphQLRepository: ExternalAIPGraphQLRepository,
	) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: UpdateOVSPassport.CLI_COMMAND,
				description: 'description',
			},
			this.updateOVSObjectPassport.bind(this),
			cli,
		);

		this.graphqlClient = new GraphQLClient(this.configService.get<string>('GRAPHQL_URL'), {
			headers: {
				Authorization: 'Bearer ' + this.configService.get<string>('AUTH_TOKEN'),
			},
		});
	}

	private async getFile(): Promise<ExcelRowObject[]> {
		const filePath: string =
			this.configService.get<string>('APP_DIR') +
			this.configService.get<string>('DOC_DIR') +
			this.configService.get<string>('READ_FILE');
		// read from xlsx file
		const maxRow = 9628;

		const workbook = xlsx.readFile(`${filePath}`, { sheetRows: maxRow });
		const workSheet = workbook.Sheets[workbook.SheetNames[0]];
		// get first sheet
		this.logger.debug(`Mapping file from ${workSheet} sheet`);
		const minRow = 2;
		let data: ExcelRowObject[] = xlsx.utils.sheet_to_json(workSheet);
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		return data;
	}

	private async updatePassportByObjectCode(installation: NormalizedInstallationFromExcel) {
		const { object } = installation;

		const assetObject: Partial<UpdateObjectInput> = {
			code: object.passport.passportIdentification,
			attributes: JSON.parse(JSON.stringify(object.passport)),
		};

		try {
			const id = await this.externalAIPGraphQLRepository.updatePassportByObjectCode(assetObject);

			this.report.success.push(`Update Passport Object ${id}`);
		} catch (err) {
			this.logger.debug('Failed to update Object', assetObject);
			this.report.failures.push({
				error: `Failed to update Object, error: ${err.message}`,
				input: assetObject,
			});
		} finally {
			this.progressTracker += 1;
			this.progressBar.update(this.progressTracker);
		}
	}

	private async updateOVSObjectPassport() {
		const excelRowObjectList: ExcelRowObject[] = await this.getFile();
		const normalizedData = await this.normalizeOVSImportData.normalizeSpanInstallationData(excelRowObjectList);

		const queue = new PQueue({ concurrency: 10 });

		Object.keys(normalizedData).forEach((key) => {
			queue.add(() => this.updatePassportByObjectCode(normalizedData[key]));
		});
		await queue.onIdle();

		this.report.file = this.configService.get<string>('READ_FILE');

		fs.writeFileSync(
			path.resolve(process.cwd(), `report_${new Date().toISOString()}.json`),
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
