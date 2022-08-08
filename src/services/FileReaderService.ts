import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import PQueue from 'p-queue';
import * as xlsx from 'xlsx';

import { EntityType } from '../XSLImport/types/EntityType';

let importedCellCount = 0;
type ProcessingError = {
	entity?: EntityType;
	rowNumber: number;
	column?: string;
	description: string;
};

const importedCellCountRegistry: { [Key in EntityType]?: number[] } = {
	Asset: [],
};

@Injectable()
export class FileReaderService {
	private static CLI_COMMAND = 'file:read';

	private static APP_DIR = '/Users/abdeljalil/Desktop/gemeente-amsterdam/bmi-aip-graphql-service/';

	private static DOC_DIR = FileReaderService.APP_DIR + 'docs/';

	private static READ_FILE = 'Moederbestand_en_mapping_table_AIP_v54_22062022.xlsx';

	private static GRAPHQL_URL = 'http://172.18.0.10:3000/graphql';

	private static AUTH_TOKEN =
		'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYS3NGX3ptcDlYOEFNc1FTcnJtMkRnemFyMkQwRy1VNG01VTRNc0EtQjVFIn0.eyJleHAiOjE2NDI1ODQwNTcsImlhdCI6MTY0MjQ5NzY5MCwiYXV0aF90aW1lIjoxNjQyNDk3NjU3LCJqdGkiOiI4YzNkZjEzOC03MTQ3LTQwMmQtYjE3OS00ZTNjNzI0NWJhNjYiLCJpc3MiOiJodHRwOi8va2V5Y2xvYWsuZGl3by5sb2NhbGhvc3Q6ODA4NS9hdXRoL3JlYWxtcy9kaXdvIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjQyZWE1OTNmLWVjNDEtNGYxZC04MjZlLWE1NzY4ZjM3Y2U5YiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImRpd28tZnJvbnRlbmQiLCJub25jZSI6ImIyMmE1M2YwLTA5ZTgtNDRlZC1hYmE0LWI5ZTEwM2QwM2QxOCIsInNlc3Npb25fc3RhdGUiOiIwZmI1NGIzZC01ODUxLTRkMDEtYjBiMi1hYjQzMTBiNmMxMjUiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRpd29fYWRtaW4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJBZG1pbiBVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGl3by5hZG1pbi51c2VyQGFtc3RlcmRhbS5ubCIsImdpdmVuX25hbWUiOiJBZG1pbiIsImZhbWlseV9uYW1lIjoiVXNlciIsImVtYWlsIjoiZGl3by5hZG1pbi51c2VyQGFtc3RlcmRhbS5ubCJ9.b9MhLdsFpVXMesfQS4OpE728vlIm9YFXrr3rhWWUc4u0v1FNthJt31epyJjqPljChdFDPj6uJqm8qRos2b6vGn_9WNY5Qazj63KaDtJ4f3TgSGs5JBUYhyk_Q5e4-KFewQL6X28KzS_xkyYpVacoUHtlDyeSxuoXIemkeuC9IspOZ6cgHSkmCPF6HeZWT0x2F2dI_LgV3s3rhcZzqocqADeSHIIOlk2XjarkJDbM9XWxWCDUehOLs96TVizA9HlC4uD_tdf-p6JLirxtA0t972u_KHLloHUSOVCLs1uhv7xofSvFgvv3whtJ_ZnYFUFmcNOzVVJ5uIlAVt3kKL2Dgg';

	private graphqlClient: GraphQLClient;

	public constructor(private readonly consoleService: ConsoleService, private readonly logger: Logger) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: FileReaderService.CLI_COMMAND,
				description: 'description',
			},
			this.process.bind(this),
			cli,
		);

		this.graphqlClient = new GraphQLClient(FileReaderService.GRAPHQL_URL, {
			headers: {
				Authorization: 'Bearer ' + FileReaderService.AUTH_TOKEN,
			},
		});
	}

	private async getFile(): Promise<any> {
		const filePath: string = FileReaderService.DOC_DIR + FileReaderService.READ_FILE;
		console.log('filePath', filePath);
		// const srcWorkbook: Workbook = new ExcelJS.Workbook();
		//read from xlsx file
		const workbook = xlsx.readFile(`${filePath}`);
		const workSheet = workbook.Sheets[workbook.SheetNames[0]];
		// get first sheet
		// const first_sheet = workbook.SheetNames[0];
		// console.log('workSheet', workSheet);
		// const workBook = await srcWorkbook.xlsx.readFile(filePath);
		this.logger.debug(`Mapping file from ${workSheet} sheet`);
		// console.log('---workBook------', workbook);

		return workSheet;
	}

	private async processRow(row: any, objectId: string): Promise<ProcessingError[]> {
		const errors: ProcessingError[] = [];
		try {
			// failureModeId = await insertOrUpdateFailureMode(
			// 	failureMode as FailureModeFlattened,
			// 	{
			// 		surveyId,
			// 		elementId: validElementId,
			// 		unitId: validUnitId,
			// 		manifestationId: validManifestationId,
			// 	},
			// 	isLegacy,
			// );
			// if (!importedCellCountRegistry.FailureMode.includes(failureMode.surveyScopeId)) {
			// 	importedCellCount += Object.keys(failureMode).length;
			// 	importedCellCountRegistry.FailureMode.push(failureMode.surveyScopeId);
			// }
		} catch (err) {
			errors.push({
				entity: 'Asset',
				rowNumber: row.number,
				description: 'Het is niet gelukt om het "Passport info" record op te slaan',
			});
		}
		return errors;
	}

	public async process(objectId: string): Promise<{ errors: ProcessingError[]; importedCellCount: number }> {
		const errors: ProcessingError[] = [];
		importedCellCount = 0;
		importedCellCountRegistry.Asset = [];

		const sheet: any = await this.getFile();
		const queue = new PQueue({ concurrency: 1 });
		// console.log('---sheetv------', sheet);
		sheet.eachRow((row, rowNumber) => {
			// Ignore header
			if (rowNumber === 1) return;
			queue.add(async () => {
				try {
					const rowErrors = await this.processRow(row, objectId);
					errors.push(...rowErrors);
				} catch (err) {
					errors.push({
						rowNumber: row.number,
						description: `Er is een onbekende fout opgetreden bij het verwerken van rij ${row.number}`,
					});
					console.error(`[Excel Import] BUG: Failed to process row`, err);
				}
			});
		});

		// Wait for queue to finish
		await queue.onIdle();

		return {
			errors,
			importedCellCount,
		};
	}
}
