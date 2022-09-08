import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import * as xlsx from 'xlsx';
import { ConfigService } from '@nestjs/config';
import PQueue from 'p-queue';

import { SupportSystemType } from '../types';
import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';
import { CorrectCoordinatesInput } from '../schema/object/dto/correct-coordinates.input';

import { ExcelRowObject, NormalizedInstallationFromExcel } from './types/excelRowObject';

@Injectable()
export class CorrectCoordinatesService {
	private static CLI_COMMAND = 'correct:coordinates';

	private static DEBUG = true;

	private graphqlClient: GraphQLClient;

	private report: {
		file: string;
		success: string[];
		failures: {
			error: string;
			input: CorrectCoordinatesInput;
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
				command: CorrectCoordinatesService.CLI_COMMAND,
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
		const workSheet = workbook.Sheets[workbook.SheetNames[1]];
		// get first sheet
		this.logger.debug(`Mapping file from ${workSheet} sheet`);
		const minRow = 2;
		let data: ExcelRowObject[] = xlsx.utils.sheet_to_json(workSheet);
		data = data.slice(minRow <= 2 ? 0 : minRow - 2);

		return data;
	}

	private async correctInstallationCoordinates(installation: NormalizedInstallationFromExcel): Promise<void> {
		try {
			await this.externalAIPGraphQLRepository.correctCoordinates({
				installationGroup: installation.id,
				source: installation,
			});

			this.report.success.push(`${installation.id}`);
		} catch (err) {
			this.logger.debug('Failed to correct installation coordinates', err.message, installation);
			this.report.failures.push({
				error: `Failed to create new Object, error: ${err.message}`,
				input: {
					installationGroup: installation.id,
					source: installation,
				},
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
					CorrectCoordinatesService.AddSupportSystemToInstallation(
						acc[installationKey],
						installationGroupRows.find((r) => r['situatie nw'] === situation),
						type,
					);
				});

				// Add a Luminaire aka "armatuur" for each row
				installationGroupRows
					.filter((row) => row['situatie nw'] === situation)
					.forEach((row) => {
						CorrectCoordinatesService.AddLuminaireToInstallation(
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
					passportCityArea: installationGroupRows[0].Stadsdeel,
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
				CorrectCoordinatesService.AddJunctionBoxToInstallation(acc[installationKey], row);
			});

			return acc;
		}, {} as Record<string, NormalizedInstallationFromExcel>);

		this.logger.verbose('Writing JSON to ./normalizedData.json');

		// For debugging purposes
		if (CorrectCoordinatesService.DEBUG) {
			fs.writeFileSync(path.resolve(process.cwd(), 'normalizedData.json'), JSON.stringify(normalizedData), {
				encoding: 'utf-8',
			});
		}

		if (CorrectCoordinatesService.DEBUG) {
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

		const queue = new PQueue({ concurrency: 10 });

		Object.keys(normalizedData).forEach((key) => {
			queue.add(() => this.correctInstallationCoordinates(normalizedData[key]));
		});
		await queue.onIdle();

		// await Promise.all(Object.keys(normalizedData).map((key) => this.createInstallation(normalizedData[key])));

		this.report.file = this.configService.get<string>('READ_FILE');
		fs.writeFileSync(
			path.resolve(process.cwd(), `cc_report_${new Date().toISOString()}.json`),
			JSON.stringify(this.report),
			{
				encoding: 'utf-8',
			},
		);

		this.logger.log(`Completed importing ${Object.keys(normalizedData).length} installations`);
	}
}
