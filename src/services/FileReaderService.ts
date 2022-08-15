import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import * as xlsx from 'xlsx';
import { uniq } from 'lodash';
import { Sheet } from 'xlsx';

import { IPassport } from '../schema/object/models/passport.model';
import { ObjectService } from '../schema/object/object.service';

@Injectable()
export class FileReaderService {
	private static CLI_COMMAND = 'file:read';

	private static APP_DIR = '/Users/abdeljalil/Desktop/gemeente-amsterdam/bmi-aip-graphql-service/';

	private static DOC_DIR = FileReaderService.APP_DIR + 'docs/';

	private static READ_FILE = 'Moederbestand_en_mapping_table_AIP_v54_22062022_2.xlsx';

	private static GRAPHQL_URL = 'http://172.18.0.10:3000/graphql';

	private static AUTH_TOKEN =
		'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYS3NGX3ptcDlYOEFNc1FTcnJtMkRnemFyMkQwRy1VNG01VTRNc0EtQjVFIn0.eyJleHAiOjE2NDI1ODQwNTcsImlhdCI6MTY0MjQ5NzY5MCwiYXV0aF90aW1lIjoxNjQyNDk3NjU3LCJqdGkiOiI4YzNkZjEzOC03MTQ3LTQwMmQtYjE3OS00ZTNjNzI0NWJhNjYiLCJpc3MiOiJodHRwOi8va2V5Y2xvYWsuZGl3by5sb2NhbGhvc3Q6ODA4NS9hdXRoL3JlYWxtcy9kaXdvIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjQyZWE1OTNmLWVjNDEtNGYxZC04MjZlLWE1NzY4ZjM3Y2U5YiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImRpd28tZnJvbnRlbmQiLCJub25jZSI6ImIyMmE1M2YwLTA5ZTgtNDRlZC1hYmE0LWI5ZTEwM2QwM2QxOCIsInNlc3Npb25fc3RhdGUiOiIwZmI1NGIzZC01ODUxLTRkMDEtYjBiMi1hYjQzMTBiNmMxMjUiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRpd29fYWRtaW4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJBZG1pbiBVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGl3by5hZG1pbi51c2VyQGFtc3RlcmRhbS5ubCIsImdpdmVuX25hbWUiOiJBZG1pbiIsImZhbWlseV9uYW1lIjoiVXNlciIsImVtYWlsIjoiZGl3by5hZG1pbi51c2VyQGFtc3RlcmRhbS5ubCJ9.b9MhLdsFpVXMesfQS4OpE728vlIm9YFXrr3rhWWUc4u0v1FNthJt31epyJjqPljChdFDPj6uJqm8qRos2b6vGn_9WNY5Qazj63KaDtJ4f3TgSGs5JBUYhyk_Q5e4-KFewQL6X28KzS_xkyYpVacoUHtlDyeSxuoXIemkeuC9IspOZ6cgHSkmCPF6HeZWT0x2F2dI_LgV3s3rhcZzqocqADeSHIIOlk2XjarkJDbM9XWxWCDUehOLs96TVizA9HlC4uD_tdf-p6JLirxtA0t972u_KHLloHUSOVCLs1uhv7xofSvFgvv3whtJ_ZnYFUFmcNOzVVJ5uIlAVt3kKL2Dgg';

	private graphqlClient: GraphQLClient;

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private readonly objectService: ObjectService,
	) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: FileReaderService.CLI_COMMAND,
				description: 'description',
			},
			this.migrateSpanInstallation.bind(this),
			cli,
		);

		this.graphqlClient = new GraphQLClient(FileReaderService.GRAPHQL_URL, {
			headers: {
				Authorization: 'Bearer ' + FileReaderService.AUTH_TOKEN,
			},
		});
	}

	private sliceArrayIntoChunks(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	private async getFile(): Promise<any> {
		const filePath: string = FileReaderService.DOC_DIR + FileReaderService.READ_FILE;
		// read from xlsx file
		const workbook = xlsx.readFile(`${filePath}`);
		const workSheet = workbook.Sheets[workbook.SheetNames[0]];
		// get first sheet
		this.logger.debug(`Mapping file from ${workSheet} sheet`);

		return workSheet;
	}

	public async migrateSpanInstallation() {
		this.logger.verbose(`Starting file migration...`);
		const migrationListChunks = this.sliceArrayIntoChunks([...(await this.importPassportInfo())], 200);
		this.logger.debug(`Created ${migrationListChunks.length} migration chunks, each roughly 200 in size.`);

		for (const migrationListChunk of migrationListChunks) {
			await this.objectService.createMany(migrationListChunk);
		}
	}

	private async importPassportInfo() {
		const workSheet: Sheet = await this.getFile();
		let rowCounter = [];
		const passportInfo: IPassport[] = [];

		for (const key of Object.keys(workSheet)) {
			const rawKey = key.match(/[a-z]+|\d+/gi);
			if (rawKey[1] !== undefined) rowCounter.push(rawKey[1]);
		}
		rowCounter = uniq(rowCounter);

		for (const row of rowCounter) {
			if (row === '0' || row === '1') continue;
			const passport: IPassport = {
				identification: workSheet['A' + row]?.v,
				cityArea: workSheet['F' + row]?.v,
				street: workSheet['I' + row]?.v,
				district: workSheet['G' + row]?.v,
				neighborhood: workSheet['H' + row]?.v,
			};

			const index: number = passportInfo.findIndex((x) => x.identification == workSheet['A' + row]?.v);

			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			index === -1 ? passportInfo.push(passport) : console.log('object already exists');
		}
		return passportInfo;
	}
}
