import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import * as xlsx from 'xlsx';
import { ConfigService } from '@nestjs/config';

import { IPassport } from '../schema/object/models/passport.model';
import { newId } from '../utils';
import { SupportSystemType } from '../types';
import { InspectionStandard } from '../schema/survey/types';
import { SurveyStates } from '../schema/survey/types/surveyStates';
import { CreateObjectInput } from '../schema/object/dto/create-object.input';
import { CreateSurveyInput } from '../schema/survey/dto/create-survey.input';
import { CreateLuminaireInput } from '../schema/span-installation/dto/create-luminaire.input';
import { CreateJunctionBoxInput } from '../schema/span-installation/dto/create-junction-box.input';
import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';
import { CreateSupportSystemInput } from '../schema/span-installation/dto/create-support-system.input';
import { transformToRD } from '../schema/span-installation/utils/transformRD';

import { ExcelRowObject, NormalizedInstallationFromExcel } from './types/excelRowObject';

@Injectable()
export class FileWriterService {
	private static CLI_COMMAND = 'file:read';

	private graphqlClient: GraphQLClient;

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

	private async createObject(excelRowObject: ExcelRowObject, passport: IPassport): Promise<string> {
		const assetObject: CreateObjectInput = {
			id: newId(),
			code: 'OVS' + ('000' + excelRowObject.Installatiegroep).slice(-4),
			clientCompanyId: 'da93b18e-8326-db37-6b30-1216f5b38b2c',
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
		await this.externalAIPGraphQLRepository.createObject(assetObject);
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
		await this.externalAIPGraphQLRepository.createSurvey(survey);
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
					coordinates: transformToRD(excelRowObject.X, excelRowObject.Y),
				},
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			};
			await this.externalAIPGraphQLRepository.createJunctionBox(junctionBox);
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

	private async createSupportSystems(objectId, surveyId, excelRowObject: ExcelRowObject) {
		const supportSystemTypes = this.getSupportSystemTypes(excelRowObject['situatie nw']);
		const supportSystemTracker = {
			[SupportSystemType.Facade]: 0,
			[SupportSystemType.Mast]: 0,
			[SupportSystemType.Node]: 0,
			[SupportSystemType.TensionWire]: 0,
		};
		for (const type of supportSystemTypes) {
			const supportSystemId = newId();
			supportSystemTracker[type] += 1;
			const supportSystem: Partial<CreateSupportSystemInput> = {
				id: supportSystemId,
				objectId: objectId,
				surveyId: surveyId,
				name: `Draagsystem ${type} ${supportSystemTracker[type]}`,
				type: type,
				location: excelRowObject['nieuwe straatnaam'], // Maps to "Straat"
				constructionYear: null, // Maps to "Jaar van aanleg"
				locationIndication: '', // Maps to "Locatie aanduiding"
				a11yDetails: '', // Maps to "Bereikbaarheid gedetailleerd"
				installationHeight: null, // Maps to "Aanleghoogte" For type `gevel |.Mast | ring`
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

			switch (type) {
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
			await this.externalAIPGraphQLRepository.createSupportSystem(supportSystem as CreateSupportSystemInput);
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
				driverCommissioningDate: null, // Maps to "Datum in gebruiksname"

				// Light
				lightSupplierType: null, // Maps to "Leverancierstype_lamp"
				lightCommissioningDate: null, // Maps to "Datum in gebruiksname"
			};
			await this.externalAIPGraphQLRepository.createLuminaire(luminaire);
		}
	}

	private getUniqueInstallationgroups(excelRowObjectList): number[] {
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

	private biggestAantal(arr): number {
		return arr.sort((a, b) => a - b)[arr.length - 1];
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

	addLuminaireToInstallation(installation: NormalizedInstallationFromExcel, row: ExcelRowObject, situation) {
		const tensionWire = installation.supportSystems.find(
			(s) => s.type === SupportSystemType.TensionWire && s['situatie nw'] === situation,
		);
		if (!tensionWire) {
			// this.logger.debug('!!!', situation, row, installation.supportSystems);
			return;
		}

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
						this.addLuminaireToInstallation(
							acc[installationKey],
							row,
							onlyAddSpin ? uniqueSituations[idx - 1] : situation,
						);
					});
			});

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
		fs.writeFileSync(path.resolve(process.cwd(), 'normalizedData.json'), JSON.stringify(normalizedData), {
			encoding: 'utf-8',
		});

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

		process.exit(0);

		// const grouped = this.groupBy(excelRowObjectList, (item) => item.Installatiegroep);
		//
		// const uniqueInstallationgroups = await this.getUniqueInstallationgroups(excelRowObjectList);
		//
		// for (const uniqueInstallationgroup of uniqueInstallationgroups) {
		// 	let passport: IPassport = {};
		// 	let excelRowObject: ExcelRowObject = {};
		// 	const groupediInstallatiegroeps: ExcelRowObject[] = grouped.get(uniqueInstallationgroup);
		// 	const situatieNWList: string[] = [];
		// 	const aantalVoedingenList: number[] = [];
		// 	const aantalArmaturenList: number[] = [];
		//
		// 	for (const item of groupediInstallatiegroeps) {
		// 		situatieNWList.push(item['situatie nw']);
		// 		aantalVoedingenList.push(item['aantal voedingen']);
		// 		aantalArmaturenList.push(item['aantal armaturen']);
		// 		if (Object.keys(item)[0]) {
		// 			passport = {
		// 				passportIdentification: String(item.Installatiegroep),
		// 				passportCityArea: item.Stadsdeel,
		// 				passportStreet: item['nieuwe straatnaam'],
		// 				passportDistrict: item.Wijk,
		// 				passportNeighborhood: item.Buurt,
		// 			};
		// 		}
		// 		excelRowObject = item;
		// 	}
		//
		// 	excelRowObject = {
		// 		...excelRowObject,
		// 		'situatie nw': this.longestString(situatieNWList),
		// 		'aantal voedingen': this.biggestAantal(aantalVoedingenList),
		// 		'aantal armaturen': this.biggestAantal(aantalArmaturenList),
		// 	};
		//
		// 	try {
		// 		const objectId = await this.createObject(excelRowObject, passport);
		// 		const surveyId = await this.createSurvey(objectId);
		// 		await this.createJuctionbox(objectId, surveyId, excelRowObject);
		// 		await this.createSupportSystems(objectId, surveyId, excelRowObject);
		// 	} catch (error) {
		// 		console.log(`Failed to create new entry, error: ${error.message}`);
		// 	}
		// }
	}
}
