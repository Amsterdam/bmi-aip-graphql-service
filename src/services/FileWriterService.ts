import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import * as xlsx from 'xlsx';
import { ConfigService } from '@nestjs/config';
import PQueue from 'p-queue';

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

import {
	ExcelJunctionBoxProps,
	ExcelRowObject,
	ExcelSupportSystemProps,
	NormalizedInstallationFromExcel,
} from './types/excelRowObject';

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

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private configService: ConfigService,
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
		junctionBox.a11yDetails = ''; // Maps to "Bereikbaarheid gedetailleerd"
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
		}
	}

	private getSupportSystemTypes(situation): SupportSystemType[] {
		switch (situation.toUpperCase()) {
			case 'MVMA':
				// MVMA = TensionWire /.Mast /.Mast
				return [SupportSystemType.TensionWire, SupportSystemType.Mast, SupportSystemType.Mast];
			case 'MVMAASPIN':
				// MVMAAspin = TensionWire /.Mast /.Mast /.Node
				return [
					SupportSystemType.TensionWire,
					SupportSystemType.Mast,
					SupportSystemType.Mast,
					SupportSystemType.Node,
				];
			case 'GMVAASPIN':
				// GMVAASPIN = TensionWire /.Facade /.Mast /.Node
				return [
					SupportSystemType.TensionWire,
					SupportSystemType.Facade,
					SupportSystemType.Mast,
					SupportSystemType.Node,
				];
			case 'MVMAA':
				// MVMAA = TensionWire /.Mast /.Mast
				return [SupportSystemType.TensionWire, SupportSystemType.Mast, SupportSystemType.Mast];
			case 'GMVA':
				// GMVA = TensionWire /.Facade /.Mast
				return [SupportSystemType.TensionWire, SupportSystemType.Facade, SupportSystemType.Node];
			case 'GMVAA':
				// GMVAA = TensionWire /.Facade /.Mast
				return [SupportSystemType.TensionWire, SupportSystemType.Facade, SupportSystemType.Mast];
			case 'GVGA':
				// GVGA = TensionWire /.Facade /.Facade
				return [SupportSystemType.TensionWire, SupportSystemType.Facade, SupportSystemType.Facade];
			case 'GVGAA':
				// GVGAA = TensionWire /.Facade /.Facade
				return [SupportSystemType.TensionWire, SupportSystemType.Facade, SupportSystemType.Facade];
			case 'ARENAWEB':
				return [SupportSystemType.TensionWire];
			default:
				return [];
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
			a11yDetails: '', // Maps to "Bereikbaarheid gedetailleerd"
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
						coordinates: [excelRowObject.X, excelRowObject.Y],
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
				}
			}),
		);
	}

	static AddSupportSystemToInstallation(
		installation: NormalizedInstallationFromExcel,
		row: ExcelRowObject,
		type: SupportSystemType,
	) {
		installation.supportSystems.push({
			type,
			Mastgetal: row.Mastgetal,
			'Techview Id': row['Techview Id'],
			Stadsdeel: row.Stadsdeel,
			Wijk: row.Wijk,
			Buurt: row.Buurt,
			'nieuwe straatnaam': row['nieuwe straatnaam'],
			X: row.X,
			Y: row.Y,
			'situatie nw': row['situatie nw'],
			'def batch': row['def batch'],
			'LOB-tram': row['LOB-tram'],
			Lichtpunthoogte: row.Lichtpunthoogte,
			luminaires: [],
		});
	}

	static AddJunctionBoxToInstallation(installation: NormalizedInstallationFromExcel, row: ExcelRowObject) {
		installation.junctionBoxes.push({
			Mastgetal: row.Mastgetal,
			'Techview Id': row['Techview Id'],
			Stadsdeel: row.Stadsdeel,
			Wijk: row.Wijk,
			Buurt: row.Buurt,
			'nieuwe straatnaam': row['nieuwe straatnaam'],
			X: row.X,
			Y: row.Y,
			'situatie nw': row['situatie nw'],
			'def batch': row['def batch'],
			'LOB-tram': row['LOB-tram'],
			Lichtpunthoogte: row.Lichtpunthoogte,
		});
	}

	static AddLuminaireToInstallation(installation: NormalizedInstallationFromExcel, row: ExcelRowObject, situation) {
		const tensionWire = installation.supportSystems.find(
			(s) => s.type === SupportSystemType.TensionWire && s['situatie nw'] === situation,
		);
		if (!tensionWire) return;

		tensionWire.luminaires.push({
			'Id-Armatuur': row['Id-Armatuur'],
			'Type Armatuur': row['Type Armatuur'],
			'Oormerk Armatuur': row['Oormerk Armatuur'],
			Familie: row.Familie,
			'Aanp. K-Hang/Bol (contract 3)': row['Aanp. K-Hang/Bol (contract 3)'],
			'Boven tram': row['Boven tram'],
			'Armatuur > 3m bovenleiding (tbv Contract 3)': row['Armatuur > 3m bovenleiding (tbv Contract 3)'],
		});
	}

	private async migrateSpanInstallation() {
		this.logger.verbose(`Starting file migration...`);
		const excelRowObjectList: ExcelRowObject[] = await this.getFile();

		const groupedData = excelRowObjectList.reduce((acc, row) => {
			const { Installatiegroep: installationGroup } = row;
			acc[installationGroup] = acc[installationGroup] || [];
			acc[installationGroup].push(row);
			return acc;
		}, {} as Record<string, ExcelRowObject[]>);

		const normalizedData = Object.keys(groupedData).reduce((acc, installationKey) => {
			// Get unique "situatie nw" strings
			const uniqueSituations = [...new Set(groupedData[installationKey].map((i) => i['situatie nw']))];
			const hasSpin = !!uniqueSituations.find((s) => s.toUpperCase().endsWith('SPIN'));
			const installationGroupRows = groupedData[installationKey];

			acc[installationKey] = acc[installationKey] || {
				id: Number(installationKey),
				spin: hasSpin,
				situations: [],
				supportSystems: [],
				junctionBoxes: [],
				totalJunctionBoxes: installationGroupRows[0]['aantal voedingen'],
				totalLuminaires: installationGroupRows[0]['aantal armaturen'],
				types: [],
				tramTracks: installationGroupRows[0]['Boven tram'] === 'ja',
			};

			// Add support systems aka "Draagsystemen"
			uniqueSituations.forEach((situation, idx) => {
				let onlyAddSpin = false;
				let types = this.getSupportSystemTypes(situation);

				if (
					idx > 0 &&
					situation.toUpperCase().endsWith('SPIN') &&
					!uniqueSituations[idx - 1].toUpperCase().endsWith('SPIN')
				) {
					// Only add Node
					types = [SupportSystemType.Node];
					onlyAddSpin = true;
				}

				acc[installationKey].types = [...acc[installationKey].types, ...types];

				types.forEach((type) => {
					FileWriterService.AddSupportSystemToInstallation(
						acc[installationKey],
						installationGroupRows.find((r) => r['situatie nw'] === situation),
						type,
					);
				});

				// Add a Luminaire aka "armatuur" for each row
				installationGroupRows
					.filter((row) => row['situatie nw'] === situation)
					.forEach((row) => {
						FileWriterService.AddLuminaireToInstallation(
							acc[installationKey],
							row,
							onlyAddSpin ? uniqueSituations[idx - 1] : situation,
						);
					});
			});

			acc[installationKey].passportSplits = !!uniqueSituations.find((situation) =>
				situation.toUpperCase().endsWith('SPIN'),
			);

			acc[installationKey].object = {
				'nieuwe straatnaam': installationGroupRows[0]['nieuwe straatnaam'],
				passport: {
					passportIdentification: String(installationKey),
					passportCityArea: '',
					passportStreet: installationGroupRows[0]['nieuwe straatnaam'],
					passportDistrict: installationGroupRows[0].Wijk,
					passportNeighborhood: installationGroupRows[0].Buurt,
					tramTracks: acc[installationKey].tramTracks,
					passportSplits: acc[installationKey].passportSplits,
				},
			};

			// Get unique rows from installation group
			const { rows: uniqueRowsInGroup } = installationGroupRows.reduce(
				(_acc, row) => {
					if (!_acc.ids.find((id) => id === Number(row.Mastgetal))) {
						_acc.rows.push(row);
					}
					_acc.ids.push(Number(row.Mastgetal));
					return _acc;
				},
				{ rows: [], ids: [] } as {
					rows: ExcelRowObject[];
					ids: number[];
				},
			);

			// Add Junction boxes aka "aansluitkast" for each unique row
			uniqueRowsInGroup.forEach((row, idx) => {
				// Check if we've reached the maximum number of junction boxes
				// We stop reading rows from that point on; first come, first served
				if (idx + 1 > acc[installationKey].totalJunctionBoxes) return;
				FileWriterService.AddJunctionBoxToInstallation(acc[installationKey], row);
			});

			return acc;
		}, {} as Record<string, NormalizedInstallationFromExcel>);

		this.logger.verbose('Writing JSON to ./normalizedData.json');

		// For debugging purposes
		if (FileWriterService.DEBUG) {
			fs.writeFileSync(path.resolve(process.cwd(), 'normalizedData.json'), JSON.stringify(normalizedData), {
				encoding: 'utf-8',
			});
		}

		if (FileWriterService.DEBUG) {
			// Validate
			Object.keys(normalizedData).forEach((id) => {
				const installation = normalizedData[id];

				const totalLuminaires = installation.supportSystems.reduce((acc, s) => {
					acc += s.luminaires.length;
					return acc;
				}, 0);

				if (installation.types.length !== installation.supportSystems.length) {
					this.logger.error(
						`Installation ${id} expected ${installation.types.length} support systems but got ${installation.supportSystems.length}`,
					);
				}

				if (totalLuminaires !== installation.totalLuminaires) {
					this.logger.error(
						`Installation ${id} expected ${installation.totalLuminaires} luminaires but got ${totalLuminaires}`,
					);
				}

				if (installation.junctionBoxes.length !== installation.totalJunctionBoxes) {
					this.logger.error(
						`Installation ${id} expected ${installation.totalJunctionBoxes} junction boxes but got ${installation.junctionBoxes.length}`,
					);
				}
			});
		}

		const queue = new PQueue({ concurrency: 1 });

		Object.keys(normalizedData).forEach((key) => {
			queue.add(() => this.createInstallation(normalizedData[key]));
		});
		await queue.onIdle();

		// await Promise.all(Object.keys(normalizedData).map((key) => this.createInstallation(normalizedData[key])));

		this.report.file = this.configService.get<string>('READ_FILE');
		fs.writeFileSync(
			path.resolve(process.cwd(), `report_${new Date().toISOString()}.json`),
			JSON.stringify(this.report),
			{
				encoding: 'utf-8',
			},
		);

		this.logger.log(`Completed importing ${Object.keys(normalizedData).length} installations`);
	}
}
