import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import * as xlsx from 'xlsx';
import { ConfigService } from '@nestjs/config';

import { IPassport } from '../schema/object/models/passport.model';
import { newId } from '../utils';
import { SupportSystemType, SupportSystemTypeDetailed } from '../types';
import { JunctionBoxRepository } from '../schema/span-installation/junction-box.repository';
import { SupportSystemRepository } from '../schema/span-installation/support-system.repository';
import { LuminaireRepository } from '../schema/span-installation/luminaire.repository';
import { ObjectRepository } from '../schema/object/object.repository';
import { InspectionStandard } from '../schema/survey/types';
import { SurveyRepository } from '../schema/survey/survey.repository';
import { SurveyStates } from '../schema/survey/types/surveyStates';
import { CreateObjectInput } from '../schema/object/dto/create-object.input';
import { CreateSurveyInput } from '../schema/survey/dto/create-survey.input';
import { CreateLuminaireInput } from '../schema/span-installation/dto/create-luminaire.input';
import { CreateSupportSystemInput } from '../schema/span-installation/dto/create-support-system.input';
import { CreateJunctionBoxInput } from '../schema/span-installation/dto/create-junction-box.input';

import { ExcelRowObject } from './types/excelRowObject';

@Injectable()
export class FileWriterService {
	private static CLI_COMMAND = 'file:read';

	private graphqlClient: GraphQLClient;

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private configService: ConfigService,
		private readonly objectRepository: ObjectRepository,
		private readonly surveyRepository: SurveyRepository,
		private readonly junctionBoxRepository: JunctionBoxRepository,
		private readonly supportSystemRepository: SupportSystemRepository,
		private readonly luminaireRepository: LuminaireRepository, // private readonly externalAIPGraphQLRepository: ExternalAIPGraphQLRepository,
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
		// let rowCounter = [];
		//
		// console.log('data', data);
		// for (const key of Object.keys(workSheet)) {
		// 	const rawKey = key.match(/[a-z]+|\d+/gi);
		// 	if (rawKey[1] !== undefined) rowCounter.push(rawKey[1]);
		// }

		// rowCounter = uniq(rowCounter);

		return data;
	}

	private async createObject(excelRowObject: ExcelRowObject, passport: IPassport): Promise<string> {
		const assetObject: CreateObjectInput = {
			id: newId(),
			code: 'OVS' + ('000' + excelRowObject.Installatiegroep).slice(-4),
			clientCompanyId: 'f1aaf90a-f560-98b9-3555-24c7a6e5ba44',
			compositionIsVisible: false,
			constructionYear: null,
			created_at: new Date(),
			customerVersion: 'amsterdam',
			effortCalculation: 0,
			effortCategory: '',
			externalRefId: '',
			inspectionStandardId: '207b5f2d-ded8-48f1-863d-bf9b6f13e602',
			isDemo: false,
			isPublic: false,
			latitude: 0.0,
			length: 0,
			longitude: 0,
			mainMaterial: '',
			managementOrganization: '',
			marineInfrastrutureType: '',
			name: 'OVS' + ('000' + excelRowObject.Installatiegroep).slice(-4),
			objectTypeId: 'd728c6da-6320-4114-ae1d-7cbcc4b8c2a0',
			operatorCompanyId: '26f0c97e-6a8f-4baf-184e-7c1c2a7964f6',
			ownerCompanyId: 'da93b18e-8326-db37-6b30-1216f5b38b2c',
			shape: '',
			shapeSrid: 0,
			siteId: '',
			squareMeters: 0,
			status: 'inUse',
			surveyorCompanyId: '26f0c97e-6a8f-4baf-184e-7c1c2a7964f6',
			trafficType: '',
			updatedOn: new Date(),
			updated_at: new Date(),
			useage: '',
			width: 0,
			attributes: JSON.parse(JSON.stringify(passport)),
			location: excelRowObject['nieuwe straatnaam'],
		};
		await this.objectRepository.createObject(assetObject);
		return assetObject.id;
	}

	private async createSurvey(objectId): Promise<string> {
		const survey: CreateSurveyInput = {
			id: newId(),
			description: 'Contract 1',
			inspectionStandardType: InspectionStandard.spanInstallation,
			objectId: objectId,
			status: SurveyStates.open,
			surveryedOn: new Date(),
			updated_at: new Date(),
			created_at: new Date(),
			condition: 'U',
		};
		await this.surveyRepository.createSurvey(survey);
		return survey.id;
	}

	private async createJuctionbox(objectId, surveyId, excelRowObject: ExcelRowObject) {
		for (let count = 1; count <= Number(excelRowObject['aantal voedingen']); count++) {
			const junctionBox: CreateJunctionBoxInput = {
				id: newId(),
				objectId: objectId,
				surveyId: surveyId,
				name: `Aansluitkast ${count}`,
				mastNumber: excelRowObject.Mastgetal, // Maps to "Mastgetal"
				location: excelRowObject['nieuwe straatnaam'], // Maps to "Straat"
				locationIndication: '', // Maps to "Locatie aanduiding"
				a11yDetails: '', // Maps to "Bereikbaarheid gedetailleerd"
				installationHeight: excelRowObject.Lichtpunthoogte, // Maps to "Aanleghoogte"
				riserTubeVisible: false, // Maps to "Stijgbuis zichtbaar"
				remarks: '', // Maps to "Opmerking"
				geography: {
					type: 'Point',
					coordinates: [excelRowObject.X, excelRowObject.Y],
				},
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			};
			await this.junctionBoxRepository.createJunctionBox(junctionBox);
		}
	}

	private getSupportSystemType(situation): SupportSystemType[] {
		let supportSystemType: SupportSystemType[] = [];
		switch (situation) {
			case 'MVMA':
				// MVMA = tensionWire / mast / mast
				supportSystemType = [SupportSystemType.tensionWire, SupportSystemType.mast, SupportSystemType.mast];
				break;
			case 'MVMAASPIN':
				// MVMAAspin = tensionWire / mast / mast / knoop
				supportSystemType = [
					SupportSystemType.tensionWire,
					SupportSystemType.mast,
					SupportSystemType.mast,
					SupportSystemType.knoop,
				];
				break;
			case 'GMVAASPIN':
				// GMVAASPIN = tensionWire / facade / mast / knoop
				supportSystemType = [
					SupportSystemType.tensionWire,
					SupportSystemType.facade,
					SupportSystemType.mast,
					SupportSystemType.knoop,
				];
			case 'MVMAA':
				// MVMAA = tensionWire / mast / mast
				supportSystemType = [SupportSystemType.tensionWire, SupportSystemType.mast, SupportSystemType.mast];
			case 'GMVA':
				// GMVA = tensionWire / facade / mast
				supportSystemType = [SupportSystemType.tensionWire, SupportSystemType.facade, SupportSystemType.knoop];
			case 'GMVAA':
				// GMVAA = tensionWire / facade / mast
				supportSystemType = [SupportSystemType.tensionWire, SupportSystemType.facade, SupportSystemType.mast];
			case 'GVGA':
				// GVGA = tensionWire / facade / facade
				supportSystemType = [SupportSystemType.tensionWire, SupportSystemType.facade, SupportSystemType.facade];
			case 'GVGAA':
				// GVGAA = tensionWire / facade / facade
				supportSystemType = [SupportSystemType.tensionWire, SupportSystemType.facade, SupportSystemType.facade];
			default:
		}
		return supportSystemType;
	}

	private async createSupportSystems(objectId, surveyId, excelRowObject: ExcelRowObject) {
		const supportSystemTypes = this.getSupportSystemType(excelRowObject['situatie nw']);
		const supportSystemTracker = {
			[SupportSystemType.facade]: 0,
			[SupportSystemType.mast]: 0,
			[SupportSystemType.knoop]: 0,
			[SupportSystemType.tensionWire]: 0,
		};
		for (const type of supportSystemTypes) {
			const supportSystemId = newId();
			supportSystemTracker[type] += 1;
			const supportSystem: CreateSupportSystemInput = {
				id: supportSystemId,
				objectId: objectId,
				surveyId: surveyId,
				name: `Draagsystem ${type} ${supportSystemTracker[type]}`,
				type: type,
				typeDetailed: SupportSystemTypeDetailed.one, // Maps to "Bereikbaarheid gedetailleerd"
				location: excelRowObject['nieuwe straatnaam'], // Maps to "Straat"
				constructionYear: null, // Maps to "Jaar van aanleg"
				locationIndication: '', // Maps to "Locatie aanduiding"
				a11yDetails: '', // Maps to "Bereikbaarheid gedetailleerd"
				installationHeight: null, // Maps to "Aanleghoogte" For type `gevel | mast | ring`
				remarks: '', // Maps to "Opmerking"
				houseNumber: '', // Maps to "Huisnummer + verdieping" For type `gevel`
				geography: {
					type: 'Point',
					coordinates: [excelRowObject.X, excelRowObject.Y],
				},
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			};
			await this.supportSystemRepository.createSupportSystem(supportSystem);
			await this.createLuminaires(supportSystemId, excelRowObject);
		}
	}

	private async createLuminaires(supportSystemId, excelRowObject: ExcelRowObject) {
		for (let count = 1; count <= Number(excelRowObject['aantal armaturen']); count++) {
			const luminaire: CreateLuminaireInput = {
				supportSystemId: supportSystemId,
				name: `Armatuur ${count}`,
				location: excelRowObject['nieuwe straatnaam'], // Maps to "Straat"
				constructionYear: null, // Maps to "Jaar van aanleg"
				supplierType: null, // Maps to "Leverancierstype"
				manufacturer: '', // Maps to "Fabrikant"
				geography: {
					type: 'Point',
					coordinates: [excelRowObject.X, excelRowObject.Y],
				},
				remarks: '', // Maps to "Opmerking"

				// Driver
				driverSupplierType: null, // Maps to "Leverancierstype_driver"
				driverCommissioningDate: new Date(), // Maps to "Datum in gebruiksname"

				// Light
				lightSupplierType: null, // Maps to "Leverancierstype_lamp"
				lightCommissioningDate: new Date(), // Maps to "Datum in gebruiksname"

				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			};
			await this.luminaireRepository.createLuminaire(luminaire);
		}
	}

	private async getUniqueInstallatiegroeps(excelRowObjectList): Promise<number[]> {
		const uniqueInstallatiegroeps: number[] = [];
		for (const item of excelRowObjectList) {
			uniqueInstallatiegroeps.push(item.Installatiegroep);
		}
		return [...new Set(uniqueInstallatiegroeps)];
	}

	private groupBy(list, keyGetter) {
		const map = new Map();
		list.forEach((item) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	}

	private longestString(arr): string {
		let long1 = arr[0];
		for (let index = 0; index < arr.length; index++) {
			if (arr[index].length > long1.length) {
				long1 = arr[index];
			}
		}
		return long1;
	}

	private async migrateSpanInstallation() {
		this.logger.verbose(`Starting file migration...`);
		const excelRowObjectList: ExcelRowObject[] = await this.getFile();

		const grouped = this.groupBy(excelRowObjectList, (item) => item.Installatiegroep);

		const uniqueInstallatiegroeps = await this.getUniqueInstallatiegroeps(excelRowObjectList);
		let passport: IPassport = {};
		let excelRowObject: ExcelRowObject = {};

		for (const uniqueInstallatiegroep of uniqueInstallatiegroeps) {
			const groupediInstallatiegroeps: ExcelRowObject[] = grouped.get(uniqueInstallatiegroep);
			const situatieNWList: string[] = [];
			const aantalVoedingenList: number[] = [];
			const aantalArmaturenList: number[] = [];

			for (const item of groupediInstallatiegroeps) {
				situatieNWList.push(item['situatie nw']);
				aantalVoedingenList.push(item['aantal voedingen']);
				aantalArmaturenList.push(item['aantal armaturen']);
				if (Object.keys(item)[0]) {
					passport = {
						passportIdentification: String(item.Installatiegroep),
						passportCityArea: item.Stadsdeel,
						passportStreet: item['nieuwe straatnaam'],
						passportDistrict: item.Wijk,
						passportNeighborhood: item.Buurt,
					};
				}
				excelRowObject = item;

				const aantalVoedingen: number = aantalVoedingenList.sort((a, b) => a - b)[
					aantalVoedingenList.length - 1
				];
				const aantalArmaturen: number = aantalArmaturenList.sort((a, b) => a - b)[
					aantalArmaturenList.length - 1
				];
				excelRowObject = {
					...excelRowObject,
					'situatie nw': this.longestString(situatieNWList),
					'aantal voedingen': aantalVoedingen,
					'aantal armaturen': aantalArmaturen,
				};
				const objectId = await this.createObject(excelRowObject, passport);
				const surveyId = await this.createSurvey(objectId);
				await this.createJuctionbox(objectId, surveyId, excelRowObject);
				await this.createSupportSystems(objectId, surveyId, excelRowObject);
			}
		}
	}
}
