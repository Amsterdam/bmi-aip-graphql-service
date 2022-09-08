import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';

import { SupportSystemType } from '../schema/span-installation/types';

import { ExcelRowObject, NormalizedInstallationFromExcel } from './types/excelRowObject';

@Injectable()
export class NormalizeOVSImportData {
	private static DEBUG = true;

	public constructor(private readonly consoleService: ConsoleService, private readonly logger: Logger) {}

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

	public async normalizeSpanInstallationData(
		excelRowObjectList: ExcelRowObject[],
	): Promise<Record<string, NormalizedInstallationFromExcel>> {
		const groupedData = excelRowObjectList.reduce((acc, row) => {
			const { Installatiegroep: installationGroup } = row;
			acc[installationGroup] = acc[installationGroup] || [];
			acc[installationGroup].push(row);
			return acc;
		}, {} as Record<string, ExcelRowObject[]>);

		const normalizedData = Object.keys(groupedData).reduce((acc, installationKey) => {
			// Get unique "situatie nw" strings
			const uniqueSituations = [...new Set(groupedData[installationKey].map((i) => i['situatie nw']))];
			const hasSpin = !!uniqueSituations.find((s) => s?.toUpperCase().endsWith('SPIN'));
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
				tramTracks: installationGroupRows[0]['Boven tram'] === 'Ja',
			};

			// Add support systems aka "Draagsystemen"
			uniqueSituations.forEach((situation, idx) => {
				let onlyAddSpin = false;
				let types = this.getSupportSystemTypes(situation);

				if (
					idx > 0 &&
					situation?.toUpperCase().endsWith('SPIN') &&
					!uniqueSituations[idx - 1]?.toUpperCase().endsWith('SPIN')
				) {
					// Only add Node
					types = [SupportSystemType.Node];
					onlyAddSpin = true;
				}

				acc[installationKey].types = [...acc[installationKey].types, ...types];

				const newTypeList = [];
				let firstTensionWire = true;

				for (const type of acc[installationKey].types) {
					if (type === SupportSystemType.TensionWire) {
						if (firstTensionWire) {
							newTypeList.push(type);
							firstTensionWire = false;
						}
					} else {
						newTypeList.push(type);
					}
				}

				acc[installationKey].types = newTypeList;

				types.forEach((type) => {
					NormalizeOVSImportData.AddSupportSystemToInstallation(
						acc[installationKey],
						installationGroupRows.find((r) => r['situatie nw'] === situation),
						type,
					);
				});

				// Add a Luminaire aka "armatuur" for each row
				installationGroupRows
					.filter((row) => row['situatie nw'] === situation)
					.forEach((row) => {
						NormalizeOVSImportData.AddLuminaireToInstallation(
							acc[installationKey],
							row,
							onlyAddSpin ? uniqueSituations[idx - 1] : situation,
						);
					});
			});

			let tensionWireCounter = 0;
			let primeTensionWireKey;
			for (const key in acc[installationKey].supportSystems) {
				const supportSystem = acc[installationKey].supportSystems[key];

				if (tensionWireCounter >= 1 && supportSystem.type === SupportSystemType.TensionWire) {
					for (const luminaire of supportSystem.luminaires) {
						acc[installationKey].supportSystems[primeTensionWireKey].luminaires.push(luminaire);
					}
					acc[installationKey].supportSystems.splice(parseInt(key), 1);
				}

				if (tensionWireCounter === 0 && supportSystem.type === SupportSystemType.TensionWire) {
					primeTensionWireKey = key;
					tensionWireCounter++;
				}
			}

			acc[installationKey].passportSplits = !!uniqueSituations.find((situation) =>
				situation?.toUpperCase().endsWith('SPIN'),
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
				NormalizeOVSImportData.AddJunctionBoxToInstallation(acc[installationKey], row);
			});

			return acc;
		}, {} as Record<string, NormalizedInstallationFromExcel>);

		this.logger.verbose('Writing JSON to ./normalizedData.json');

		// For debugging purposes
		if (NormalizeOVSImportData.DEBUG) {
			fs.writeFileSync(path.resolve(process.cwd(), 'normalizedData.json'), JSON.stringify(normalizedData), {
				encoding: 'utf-8',
			});
		}

		if (NormalizeOVSImportData.DEBUG) {
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

		return normalizedData;
	}

	private getSupportSystemTypes(situation): SupportSystemType[] {
		switch (situation?.toUpperCase()) {
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
}
