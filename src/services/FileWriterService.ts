import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import * as xlsx from 'xlsx';
import { uniq } from 'lodash';
import { ConfigService } from '@nestjs/config';

import { IPassport } from '../schema/object/models/passport.model';
import { newId } from '../utils';
import { SupplierType, SupportSystemType, SupportSystemTypeDetailedMast } from '../types';
import { JunctionBoxRepository } from '../schema/span-installation/junction-box.repository';
import { SupportSystemRepository } from '../schema/span-installation/support-system.repository';
import { LuminaireRepository } from '../schema/span-installation/luminaire.repository';
import { ObjectRepository } from '../schema/object/object.repository';
import { InspectionStandard } from '../schema/survey/types';
import { SurveyRepository } from '../schema/survey/survey.repository';
import { SurveyStates } from '../schema/survey/types/surveyStates';
import { ExternalObjectRepository } from '../externalRepository/ExternalObjectRepository';
import { CreateObjectInput } from '../schema/object/dto/create-object.input';
import { CreateSurveyInput } from '../schema/survey/dto/create-survey.input';
import { CreateLuminaireInput } from '../schema/span-installation/dto/create-luminaire.input';
import { CreateJunctionBoxInput } from '../schema/span-installation/dto/create-junction-box.input';
import { CreateSupportSystemNormalizedInput } from '../schema/span-installation/dto/create-support-system-normalized.input';

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
		private readonly luminaireRepository: LuminaireRepository,
		private readonly externalObjectRepository: ExternalObjectRepository,
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

	private async getFile(): Promise<{ workSheet: any; rowCounter: any[] }> {
		const filePath: string =
			this.configService.get<string>('APP_DIR') +
			this.configService.get<string>('DOC_DIR') +
			this.configService.get<string>('READ_FILE');
		// read from xlsx file
		const workbook = xlsx.readFile(`${filePath}`);
		const workSheet = workbook.Sheets[workbook.SheetNames[0]];
		// get first sheet
		this.logger.debug(`Mapping file from ${workSheet} sheet`);

		let rowCounter = [];

		for (const key of Object.keys(workSheet)) {
			const rawKey = key.match(/[a-z]+|\d+/gi);
			if (rawKey[1] !== undefined) rowCounter.push(rawKey[1]);
		}

		rowCounter = uniq(rowCounter);

		return { workSheet, rowCounter };
	}

	private async createObject(
		objectId: string,
		row: string,
		workSheet,
		passport: IPassport,
	): Promise<CreateObjectInput> {
		const passportInfo: IPassport[] = [];
		passportInfo.push(passport);
		const assetObject: CreateObjectInput = {
			id: objectId,
			code: 'OVS' + ('000' + workSheet['A' + row]?.v).slice(-4),
			clientCompanyId: 'f1aaf90a-f560-98b9-3555-24c7a6e5ba44',
			compositionIsVisible: false,
			constructionYear: 0,
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
			name: '',
			objectTypeId: 'd728c6da-6320-4114-ae1d-7cbcc4b8c2a0',
			operatorCompanyId: '26f0c97e-6a8f-4baf-184e-7c1c2a7964f6',
			ownerCompanyId: 'da93b18e-8326-db37-6b30-1216f5b38b2c',
			shape: '',
			shapeSrid: 0,
			siteId: '',
			squareMeters: 0,
			status: '',
			surveyorCompanyId: '26f0c97e-6a8f-4baf-184e-7c1c2a7964f6',
			trafficType: '',
			updatedOn: new Date(),
			updated_at: new Date(),
			useage: '',
			width: 0,
			attributes: JSON.parse(JSON.stringify(passportInfo)),
			location: '',
		};
		return assetObject;
	}

	private async createJuctionbox(objectId, surveyId, row, workSheet) {
		for (let count = 1; count <= Number(workSheet['B' + row]?.v); count++) {
			const junctionBox: CreateJunctionBoxInput = {
				id: newId(),
				objectId: objectId,
				surveyId: surveyId,
				name: `${count}`,
				mastNumber: workSheet['D' + row]?.v, // Maps to "Mastgetal"
				location: workSheet['I' + row]?.v, // Maps to "Straat"
				locationIndication: '', // Maps to "Locatie aanduiding"
				a11yDetails: '', // Maps to "Bereikbaarheid gedetailleerd"
				installationHeight: workSheet['V' + row]?.v, // Maps to "Aanleghoogte"
				riserTubeVisible: false, // Maps to "Stijgbuis zichtbaar"
				remarks: '', // Maps to "Opmerking"
				geography: {
					type: 'Point',
					coordinates: [workSheet['J' + row]?.v, workSheet['K' + row]?.v],
				},
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			};
			console.log('junctionBox', junctionBox);
			await this.junctionBoxRepository.createJunctionBox(junctionBox);
		}
	}

	private getSupportSystemType(situation): SupportSystemType[] {
		let supportSystemType: SupportSystemType[] = [];
		switch (situation) {
			case 'MVMA':
				// MVMA =.TensionWire / mast / mast
				supportSystemType = [SupportSystemType.TensionWire, SupportSystemType.Mast, SupportSystemType.Mast];
				break;
			case 'MVMAASPIN':
				// MVMAAspin =.TensionWire / mast / mast / node
				supportSystemType = [
					SupportSystemType.TensionWire,
					SupportSystemType.Mast,
					SupportSystemType.Mast,
					SupportSystemType.Node,
				];
				break;
			case 'GMVAASPIN':
				// GMVAASPIN =.TensionWire / facade / mast / node
				supportSystemType = [
					SupportSystemType.TensionWire,
					SupportSystemType.Facade,
					SupportSystemType.Mast,
					SupportSystemType.Node,
				];
			case 'MVMAA':
				// MVMAA =.TensionWire / mast / mast
				supportSystemType = [SupportSystemType.TensionWire, SupportSystemType.Mast, SupportSystemType.Mast];
			case 'GMVA':
				// GMVA =.TensionWire / facade / mast
				supportSystemType = [SupportSystemType.TensionWire, SupportSystemType.Facade, SupportSystemType.Node];
			case 'GMVAA':
				// GMVAA =.TensionWire / facade / mast
				supportSystemType = [SupportSystemType.TensionWire, SupportSystemType.Facade, SupportSystemType.Mast];
			case 'GVGA':
				// GVGA =.TensionWire / facade / facade
				supportSystemType = [SupportSystemType.TensionWire, SupportSystemType.Facade, SupportSystemType.Facade];
			case 'GVGAA':
				// GVGAA =.TensionWire / facade / facade
				supportSystemType = [SupportSystemType.TensionWire, SupportSystemType.Facade, SupportSystemType.Facade];
			default:
		}
		return supportSystemType;
	}

	private getsupportSystemName(type, supportSystemTypes): string {
		let supportSystemName = '';
		const sameTypes = [...new Set(supportSystemTypes.filter((_type) => _type == type))];
		if (sameTypes.includes(type)) {
			for (let i = 1; i <= sameTypes.length; i++) {
				supportSystemName = `Draagsystem ${i}`;
			}
		}
		return supportSystemName;
	}

	private async createSupportSystem(objectId, surveyId, supportSystemId, row, workSheet) {
		const supportSystemTypes = this.getSupportSystemType(workSheet['L' + row]?.v);

		for (const type of supportSystemTypes) {
			const supportSystemName = this.getsupportSystemName(type, supportSystemTypes);
			const supportSystem: CreateSupportSystemNormalizedInput = {
				id: newId(),
				objectId: objectId,
				surveyId: surveyId,
				name: supportSystemName,
				type: type,
				typeDetailed: SupportSystemTypeDetailedMast.Spanmast, // Maps to "Bereikbaarheid gedetailleerd"
				location: workSheet['I' + row]?.v, // Maps to "Straat"
				constructionYear: 1979, // Maps to "Jaar van aanleg"
				locationIndication: '', // Maps to "Locatie aanduiding"
				a11yDetails: '', // Maps to "Bereikbaarheid gedetailleerd"
				installationHeight: 320, // Maps to "Aanleghoogte" For type `gevel | mast | ring`
				remarks: '', // Maps to "Opmerking"
				houseNumber: '', // Maps to "Huisnummer + verdieping" For type `gevel`
				geography: {
					type: 'Point',
					coordinates: [workSheet['J' + row]?.v, workSheet['K' + row]?.v],
				},
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			};
			await this.supportSystemRepository.createSupportSystem(supportSystem);
		}
	}

	private async createLuminaires(supportSystemId, row, workSheet) {
		for (let count = 1; count <= Number(workSheet['C' + row]?.v); count++) {
			const luminaire: CreateLuminaireInput = {
				supportSystemId: supportSystemId,
				name: `Armatuur + ${count}`,
				location: workSheet['I' + row]?.v, // Maps to "Straat"
				constructionYear: null, // Maps to "Jaar van aanleg"
				supplierType: SupplierType.one, // Maps to "Leverancierstype"
				manufacturer: '', // Maps to "Fabrikant"
				geography: {
					type: 'Point',
					coordinates: [workSheet['J' + row]?.v, workSheet['K' + row]?.v],
				},
				remarks: '', // Maps to "Opmerking"

				// Driver
				driverSupplierType: SupplierType.one, // Maps to "Leverancierstype_driver"
				driverCommissioningDate: new Date(), // Maps to "Datum in gebruiksname"

				// Light
				lightSupplierType: SupplierType.two, // Maps to "Leverancierstype_lamp"
				lightCommissioningDate: new Date(), // Maps to "Datum in gebruiksname"

				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			};
			await this.luminaireRepository.createLuminaire(luminaire);
		}
	}

	private async createSurvey(objectId, surveyId) {
		const survey: CreateSurveyInput = {
			id: surveyId,
			description: '',
			inspectionStandardType: InspectionStandard.overspanningsInstallatie,
			objectId: objectId,
			status: SurveyStates.open,
			surveryedOn: new Date(),
			updated_at: new Date(),
			created_at: new Date(),
			condition: 'U',
		};
		await this.surveyRepository.createSurvey(survey);
	}

	private async migrateSpanInstallation() {
		this.logger.verbose(`Starting file migration...`);
		let objectId = '';
		let surveyId = '';
		let supportSystemId = '';

		const passportInfo: IPassport[] = [];
		const { workSheet, rowCounter } = await this.getFile();

		for (const row of rowCounter) {
			if (row === '0' || row === '1') continue;
			const passport: IPassport = {
				passportIdentification: workSheet['A' + row]?.v,
				passportCityArea: workSheet['F' + row]?.v,
				passportStreet: workSheet['I' + row]?.v,
				passportDistrict: workSheet['G' + row]?.v,
				passportNeighborhood: workSheet['H' + row]?.v,
			};

			const index: number = passportInfo.findIndex((x) => x.passportIdentification == workSheet['A' + row]?.v);

			if (index === -1) {
				objectId = newId();
				surveyId = newId();
				passportInfo.push(passport);
				const input: CreateObjectInput = await this.createObject(objectId, row, workSheet, passport);
				//await this.externalObjectRepository.createObject(input);
				await this.objectRepository.createObject(input);
				await this.createSurvey(objectId, surveyId);
			} else {
				console.log('object already exists');
			}
			supportSystemId = newId();

			await this.createJuctionbox(objectId, surveyId, row, workSheet);
			await this.createSupportSystem(objectId, surveyId, supportSystemId, row, workSheet);
			await this.createLuminaires(supportSystemId, row, workSheet);
		}
	}
}
