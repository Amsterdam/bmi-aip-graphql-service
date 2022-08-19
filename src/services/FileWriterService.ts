import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import * as xlsx from 'xlsx';
import { uniq } from 'lodash';
import { Sheet } from 'xlsx';
import { ConfigService } from '@nestjs/config';

import { IPassport } from '../schema/object/models/passport.model';
import { ObjectService } from '../schema/object/object.service';
import { AssetObject } from '../schema/object/models/object.model';
import { JunctionBox } from '../schema/span-installation/models/junction-box.model';
import { newId } from '../utils';
import { Luminaire } from '../schema/span-installation/models/luminaire.model';
import { SupplierType, SupportSystemType, SupportSystemTypeDetailed } from '../types';
import { SupportSystem } from '../schema/span-installation/models/support-system.model';

@Injectable()
export class FileWriterService {
	private static CLI_COMMAND = 'file:read';

	private graphqlClient: GraphQLClient;

	private workSheet: Sheet;

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private readonly objectService: ObjectService,
		private configService: ConfigService,
	) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: FileWriterService.CLI_COMMAND,
				description: 'description',
			},
			this.migrateSpanInstallation.bind(this),
			cli,
		);

		this.graphqlClient = new GraphQLClient(this.configService.get<string>('GRAPHQL_URL'), {
			headers: {
				Authorization: 'Bearer ' + this.configService.get<string>('AUTH_TOKEN'),
			},
		});
		this.workSheet = this.getFile();
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
		const filePath: string =
			this.configService.get<string>('APP_DIR') +
			this.configService.get<string>('DOC_DIR') +
			this.configService.get<string>('READ_FILE');
		// read from xlsx file
		const workbook = xlsx.readFile(`${filePath}`);
		const workSheet = workbook.Sheets[workbook.SheetNames[0]];
		// get first sheet
		this.logger.debug(`Mapping file from ${workSheet} sheet`);

		return workSheet;
	}

	public async migrateSpanInstallation() {
		this.logger.verbose(`Starting file migration...`);
		const migrationListChunks = this.sliceArrayIntoChunks([...(await this.importObject())], 200);
		this.logger.debug(`Created ${migrationListChunks.length} migration chunks, each roughly 200 in size.`);

		for (const migrationListChunk of migrationListChunks) {
			await this.objectService.createMany(migrationListChunk);
		}
	}

	private async importObject(): Promise<AssetObject[]> {
		let rowCounter = [];
		const passportInfo: IPassport[] = [];
		const assetObjects: AssetObject[] = [];

		for (const key of Object.keys(this.workSheet)) {
			const rawKey = key.match(/[a-z]+|\d+/gi);
			if (rawKey[1] !== undefined) rowCounter.push(rawKey[1]);
		}
		rowCounter = uniq(rowCounter);

		for (const row of rowCounter) {
			if (row === '0' || row === '1') continue;
			const passport: IPassport = {
				passportIdentification: this.workSheet['A' + row]?.v,
				passportCityArea: this.workSheet['F' + row]?.v,
				passportStreet: this.workSheet['I' + row]?.v,
				passportDistrict: this.workSheet['G' + row]?.v,
				passportNeighborhood: this.workSheet['H' + row]?.v,
			};

			const index: number = passportInfo.findIndex(
				(x) => x.passportIdentification == this.workSheet['A' + row]?.v,
			);

			const objectId = newId();
			if (index === -1) {
				const assetObject: AssetObject = {
					id: objectId,
					code: 'OVS' + ('000' + this.workSheet['A' + row]?.v).slice(-4),
					clientCompanyId: '',
					compositionIsVisible: false,
					constructionYear: 0,
					created_at: '',
					customerVersion: '',
					effortCalculation: 0,
					effortCategory: '',
					externalRefId: '',
					inspectionStandardId: '',
					isDemo: false,
					isPublic: false,
					// latitude: 0.0,
					// length: 0,
					// longitude: 0,
					mainMaterial: '',
					managementOrganization: '',
					marineInfrastrutureType: '',
					name: '',
					objectTypeId: '',
					operatorCompanyId: '',
					ownerCompanyId: '',
					shape: '',
					shapeSrid: 0,
					siteId: '',
					// squareMeters: 0,
					status: '',
					surveyorCompanyId: '',
					trafficType: '',
					updatedOn: '',
					updated_at: '',
					useage: '',
					// width: 0,
					attributes: passportInfo.push(passport),
				};
				assetObjects.push(assetObject);
			} else {
				console.log('object already exists');
			}
			const junctionBoxs: JunctionBox[] = [];
			const junctionBox: JunctionBox = {
				id: newId(),
				objectId: objectId,
				surveyId: '',
				name: '',
				mastNumber: this.workSheet['D' + row]?.v,
				location: this.workSheet['A' + row]?.v,
				// locationIndication: this.workSheet['A' + row]?.v,
				// a11yDetails: this.workSheet['A' + row]?.v,
				installationHeight: this.workSheet['V' + row]?.v,
				riserTubeVisible: false,
				// remarks: this.workSheet['A' + row]?.v,
				geography: {
					type: 'Point',
					coordinates: [this.workSheet['J' + row]?.v, this.workSheet['K' + row]?.v],
				},
				createdAt: String(Date.now()),
				updatedAt: String(Date.now()),
				deletedAt: String(Date.now()),
			};
			junctionBoxs.push(junctionBox);
			console.log('junctionBox', junctionBoxs);

			const supportSystemId = newId();

			for (let i = 1; i < Number(this.workSheet['B' + row]?.v); i++) {
				const supportSystem: SupportSystem = {
					id: supportSystemId,
					objectId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
					surveyId: '388ecaaa-c6c2-4613-aa14-f206cf577ca7',
					name: `voeding + ${i}`,
					type: SupportSystemType.facade,
					typeDetailed: SupportSystemTypeDetailed.two,
					location: null,
					constructionYear: 1979,
					locationIndication: '__LOCATION__INDICATION__',
					a11yDetails: '__A11Y_DETAILS__',
					installationHeight: 320,
					remarks: '',
					houseNumber: '',
					geography: {
						type: 'Point',
						coordinates: [this.workSheet['J' + row]?.v, this.workSheet['K' + row]?.v],
					},
					createdAt: String(Date.now()),
					updatedAt: String(Date.now()),
					deletedAt: String(Date.now()),
				};
				console.log('supportSystem', supportSystem);
			}

			for (let i = 1; i < Number(this.workSheet['C' + row]?.v); i++) {
				const luminaire: Luminaire = {
					id: newId(),
					supportSystemId: supportSystemId,
					name: `Armatuur + ${i}`,
					location: this.workSheet['I' + row]?.v,
					constructionYear: null,
					supplierType: SupplierType.two,
					manufacturer: '__MANUFACTURER__',
					geography: {
						type: 'Point',
						coordinates: [this.workSheet['J' + row]?.v, this.workSheet['K' + row]?.v],
					},
					remarks: '',

					// Driver
					driverSupplierType: SupplierType.one,
					driverCommissioningDate: null,

					// Light
					lightSupplierType: SupplierType.two,
					lightCommissioningDate: '',

					createdAt: String(Date.now()),
					updatedAt: String(Date.now()),
					deletedAt: String(Date.now()),
				};
				console.log('luminaire', luminaire);
			}
		}
		return assetObjects;
	}
}
