import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import { ConfigService } from '@nestjs/config';
import { SingleBar } from 'cli-progress';
import PQueue from 'p-queue';
import * as xlsx from 'xlsx';

import { SupportSystemType } from '../types';
import { InspectionStandard } from '../schema/survey/types';
import { SurveyStates } from '../schema/survey/types/surveyStates';
import { CreateObjectInput } from '../schema/object/dto/create-object.input';
import { CreateSurveyInput } from '../schema/survey/dto/create-survey.input';
import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';
import { CreateSupportSystemInput } from '../schema/span-installation/dto/create-support-system.input';
import { CreateLuminaireInput } from '../schema/span-installation/dto/create-luminaire.input';
import { CreateJunctionBoxInput } from '../schema/span-installation/dto/create-junction-box.input';
import { transformRDToWGS } from '../schema/span-installation/utils/transformRD';
import { A11yDetails } from '../schema/span-installation/models/a11y-details.model';

import {
	ExcelJunctionBoxProps,
	ExcelRowObject,
	ExcelSupportSystemProps,
	NormalizedInstallationFromExcel,
} from './types/excelRowObject';
import { NormalizeOVSImportData } from './NormalizeOVSImportData';

@Injectable()
export class FileWriterService {
	private static CLI_COMMAND = 'file:read';

	private static DEBUG = true;

	private graphqlClient: GraphQLClient;

	private report: {
		file: string;
		success: string[];
		failures: {
			error: string;
			input:
				| CreateObjectInput
				| CreateSurveyInput
				| CreateSupportSystemInput
				| CreateLuminaireInput
				| CreateJunctionBoxInput;
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

	private async createInstallation(installation: NormalizedInstallationFromExcel): Promise<void> {
		const { supportSystems, junctionBoxes, object } = installation;

		const objectId = await this.createObject(object);
		if (!objectId) return;

		const surveyId = await this.createSurvey(objectId);
		if (!surveyId) return;

		const supportSystemTracker = {
			[SupportSystemType.Facade]: 0,
			[SupportSystemType.Mast]: 0,
			[SupportSystemType.Node]: 0,
			[SupportSystemType.TensionWire]: 0,
		};

		await Promise.all(
			supportSystems.map(async (s) => {
				const count = (supportSystemTracker[s.type] += 1);
				await this.createSupportSystem(objectId, surveyId, s, count);
			}),
		);

		await Promise.all(
			junctionBoxes.map(async (jb, idx) => {
				await this.createJuctionbox(objectId, surveyId, jb, idx + 1);
			}),
		);
	}

	private async createObject(object: NormalizedInstallationFromExcel['object']): Promise<string> {
		const {
			passport: { passportIdentification },
		} = object;
		const assetObject: CreateObjectInput = {
			code: 'OVS' + ('000' + passportIdentification).slice(-4),
			clientCompanyId: 'da93b18e-8326-db37-6b30-1216f5b38b2c',
			compositionIsVisible: false,
			constructionYear: null,
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
			name: 'OVS' + ('000' + passportIdentification).slice(-4),
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
			useage: '',
			width: 0,
			attributes: JSON.parse(JSON.stringify(object.passport)),
			location: object['nieuwe straatnaam'],
		};
		try {
			const { id } = await this.externalAIPGraphQLRepository.createObject(assetObject);

			this.report.success.push(`Created new Object with ID ${id}`);

			return id;
		} catch (err) {
			this.logger.debug('Failed to create Object', assetObject);
			this.report.failures.push({
				error: `Failed to create new Object, error: ${err.message}`,
				input: assetObject,
			});
		} finally {
			this.progressTracker += 1;
			this.progressBar.update(this.progressTracker);
		}
	}

	private async createSurvey(objectId): Promise<string> {
		const survey: CreateSurveyInput = {
			description: 'Contract 1',
			inspectionStandardType: InspectionStandard.spanInstallation,
			objectId: objectId,
			status: SurveyStates.open,
			surveyedOn: new Date(),
			updatedOn: new Date(),
			condition: 'U',
		};
		try {
			const { id } = await this.externalAIPGraphQLRepository.createSurvey(survey);

			this.report.success.push(`Created new Survey with ID ${id}`);

			return id;
		} catch (err) {
			this.logger.debug('Failed to create Survey', survey);
			this.report.failures.push({
				error: `Failed to create new Survey, error: ${err.message}`,
				input: survey,
			});
		} finally {
			this.progressTracker += 1;
			this.progressBar.update(this.progressTracker);
		}
	}

	private async createJuctionbox(objectId, surveyId, excelRowObject: ExcelJunctionBoxProps, count: number) {
		const junctionBox: CreateJunctionBoxInput = new CreateJunctionBoxInput();
		junctionBox.objectId = objectId;
		junctionBox.surveyId = surveyId;
		junctionBox.name = `Aansluitkast ${count}`;
		junctionBox.mastNumber = excelRowObject.Mastgetal; // Maps to "Mastgetal"
		junctionBox.location = excelRowObject['nieuwe straatnaam']; // Maps to "Straat"
		junctionBox.locationIndication = ''; // Maps to "Locatie aanduiding"
		junctionBox.a11yDetails = new A11yDetails(); // Maps to "Bereikbaarheid gedetailleerd"
		junctionBox.installationHeight = excelRowObject.Lichtpunthoogte; // Maps to "Aanleghoogte"
		junctionBox.riserTubeVisible = false; // Maps to "Stijgbuis zichtbaar"
		junctionBox.remarks = ''; // Maps to "Opmerking"
		junctionBox.geography = {
			type: 'Point',
			coordinates: transformRDToWGS([excelRowObject.X, excelRowObject.Y]),
		};

		try {
			const { id } = await this.externalAIPGraphQLRepository.createJunctionBox(junctionBox);
			this.report.success.push(`Created new JunctionBox with ID ${id}`);
		} catch (err) {
			this.logger.debug('Failed to create junctionBox', junctionBox);
			this.report.failures.push({
				error: `Failed to create new entry, error: ${err.message}`,
				input: junctionBox,
			});
		} finally {
			this.progressTracker += 1;
			this.progressBar.update(this.progressTracker);
		}
	}

	static GetSupportSystemNameFromType(type: SupportSystemType): string {
		switch (type) {
			case SupportSystemType.Facade:
				return 'Gevel';
			case SupportSystemType.Node:
				return 'Knoop';
			case SupportSystemType.Mast:
				return 'Mast';
			case SupportSystemType.TensionWire:
				return 'Spandraad';
		}
	}

	private async createSupportSystem(objectId, surveyId, supportSystemProps: ExcelSupportSystemProps, count: number) {
		const supportSystem: Partial<CreateSupportSystemInput> = {
			objectId: objectId,
			surveyId: surveyId,
			name: `${FileWriterService.GetSupportSystemNameFromType(supportSystemProps.type)} ${count}`,
			type: supportSystemProps.type,
			location: supportSystemProps['nieuwe straatnaam'], // Maps to "Straat"
			constructionYear: null, // Maps to "Jaar van aanleg"
			locationIndication: '', // Maps to "Locatie aanduiding"
			a11yDetails: {}, // Maps to "Bereikbaarheid gedetailleerd"
			installationHeight: supportSystemProps.Lichtpunthoogte, // Maps to "Aanleghoogte" For type `gevel |.Mast | ring`
			remarks: '', // Maps to "Opmerking"
			houseNumber: '', // Maps to "Huisnummer + verdieping" For type `gevel`
			geography: {
				type: 'Point',
				coordinates: transformRDToWGS([supportSystemProps.X, supportSystemProps.Y]),
			},
		};

		switch (supportSystem.type) {
			case SupportSystemType.Facade:
				supportSystem.typeDetailedFacade = null;
				break;
			case SupportSystemType.Node:
				supportSystem.typeDetailedNode = null;
				break;
			case SupportSystemType.Mast:
				supportSystem.typeDetailedMast = null;
				break;
			case SupportSystemType.TensionWire:
				supportSystem.typeDetailedTensionWire = null;
				break;
		}
		try {
			const { id } = await this.externalAIPGraphQLRepository.createSupportSystem(
				supportSystem as CreateSupportSystemInput,
			);
			await this.createLuminaires(id, supportSystemProps);
			this.report.success.push(`Created new Support System with ID ${id} (+ Luminaires)`);
		} catch (err) {
			this.logger.debug('Failed to create SupportSystem or its Luminaires', supportSystem);
			this.report.failures.push({
				error: `Failed to create new supportSystem, error: ${err.message}`,
				input: supportSystem as CreateSupportSystemInput,
			});
		} finally {
			this.progressTracker += 1;
			this.progressBar.update(this.progressTracker);
		}
	}

	private async createLuminaires(supportSystemId: string, excelRowObject: ExcelSupportSystemProps) {
		await Promise.all(
			excelRowObject.luminaires.map(async (luminaire, idx) => {
				const input: CreateLuminaireInput = {
					supportSystemId: supportSystemId,
					name: `Armatuur ${idx + 1}`,
					location: excelRowObject['nieuwe straatnaam'], // Maps to "Straat"
					constructionYear: null, // Maps to "Jaar van aanleg"
					supplierType: null, // Maps to "Leverancierstype"
					manufacturer: '', // Maps to "Fabrikant"
					geography: {
						type: 'Point',
						coordinates: transformRDToWGS([excelRowObject.X, excelRowObject.Y]),
					},
					remarks: '', // Maps to "Opmerking"

					// Driver
					driverSupplierType: null, // Maps to "Leverancierstype_driver"
					driverCommissioningDate: null, // Maps to "Datum in gebruiksname"

					// Light
					lightSupplierType: null, // Maps to "Leverancierstype_lamp"
					lightCommissioningDate: null, // Maps to "Datum in gebruiksname"
				};

				try {
					const { id } = await this.externalAIPGraphQLRepository.createLuminaire(input);
					this.report.success.push(`Created new Luminaire with ID ${id}`);
				} catch (err) {
					this.logger.debug('Failed to create luminaire', input);
					this.report.failures.push({
						error: `Failed to create new supportSystem, error: ${err.message}`,
						input,
					});
				} finally {
					this.progressTracker += 1;
					this.progressBar.update(this.progressTracker);
				}
			}),
		);
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

	private async migrateSpanInstallation() {
		const excelRowObjectList: ExcelRowObject[] = await this.getFile();
		const normalizedData = await this.normalizeOVSImportData.normalizeSpanInstallationData(excelRowObjectList);

		this.logger.verbose(`Starting file migration...`);

		this.progressBar.start(
			Object.keys(normalizedData).reduce((acc, installation) => {
				acc += 2; // 1 object, 1 survey

				// Luminaires
				acc += (normalizedData[installation]?.supportSystems ?? []).reduce((_acc, supportSystem) => {
					_acc += supportSystem.luminaires.length;
					return _acc;
				}, 0);

				// Support Systems
				acc += (normalizedData[installation]?.supportSystems ?? []).length;

				// Junction Boxes
				acc += (normalizedData[installation]?.junctionBoxes ?? []).length;
				return acc;
			}, 0),
			0,
		);

		const queue = new PQueue({ concurrency: 10 });

		Object.keys(normalizedData).forEach((key) => {
			queue.add(() => this.createInstallation(normalizedData[key]));
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
