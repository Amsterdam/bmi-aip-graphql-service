import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { SpanDecompositionType } from 'src/schema/span-installation/types/span-decomposition-type';
import { SpanMeasureItemType } from 'src/schema/span-installation/types/span-measure-item-type';
import { newId } from 'src/utils';

import { OVSSpanMeasureExcelRowObject } from './types/excelRowObject';
import { MeasureItemOption } from './types/MeasureItemOption';
import { MeasureOption } from './types/MeasureOption';

@Injectable()
export class NormalizeOVSMeasureData {
	private static DEBUG = true;

	public constructor(private readonly consoleService: ConsoleService, private readonly logger: Logger) {}

	private mapDecompositionType(input: string): string {
		switch (input) {
			case 'Aansluitkast':
				return SpanDecompositionType.spanJunctionBox;
				break;
			case 'Mast':
				return SpanDecompositionType.spanSupportSystemMast;
				break;
			case 'Knoop':
				return SpanDecompositionType.spanSupportSystemNode;
				break;
			case 'Gevel':
				return SpanDecompositionType.spanSupportSystemFacade;
				break;
			case 'Spandraad':
				return SpanDecompositionType.spanSupportSystemTensionWire;
				break;
			case 'Armatuur':
				return SpanDecompositionType.spanLuminaire;
				break;
		}
	}

	private mapItemType(input: string): string {
		switch (input) {
			case 'Aansluitkast':
				return SpanMeasureItemType.material;
				break;
		}
	}

	public async saveToFile(normalizedData: Record<string, any>) {
		const filePath = path.resolve(
			process.cwd(),
			'src/schema/span-installation/types/data/normalized-data-measures.json',
		);
		this.logger.verbose('Writing JSON to file: ' + filePath);

		fs.writeFileSync(filePath, JSON.stringify(normalizedData), {
			encoding: 'utf-8',
		});
	}

	public formatMaterial(element: string): MeasureItemOption {
		const material = {
			id: newId(),
			itemType: SpanMeasureItemType.material,
			description: element ?? '',
		};

		return material;
	}

	public formatSpecificationItem(element: string): MeasureItemOption {
		const specificationItem = {
			id: newId(),
			itemType: SpanMeasureItemType.specificationItem,
			description: element ?? '',
		};

		return specificationItem;
	}

	public fetchFromList(key, list, itemType: SpanMeasureItemType) {
		const foundItem = list.find((item) => {
			key = key.replace(/\s/g, ''); // sanitize lookup key
			return item.referenceNumber === key;
		});

		if (key && !foundItem) {
			this.logger.warn('Matrix contains reference number that is not recognized: ' + key);
			//throw new Error('Matrix contains reference number that is not recognized');
		}

		return foundItem;
	}

	public parseSpecificationItems(key: string, list: any): MeasureItemOption[] {
		if (!key) {
			return [];
		}

		const array = key.toString().split(',');
		return array.reduce((acc, item) => {
			const itemsSplitByComma = item.toString().split(',');
			const foundItem = this.fetchFromList(itemsSplitByComma[0], list, SpanMeasureItemType.specificationItem);

			if (!foundItem) {
				return acc;
			}

			return [...acc, foundItem];
		}, []);
	}

	public parseMaterials(key: string, list: any): MeasureItemOption[] {
		if (!key) {
			return [];
		}

		const itemsSplitByNewline = key.toString().split('\n');
		return itemsSplitByNewline.reduce((acc, item) => {
			const itemsSplitBySpace = item.toString().split(' '); // reference number is the first 'word' in the title
			const foundItem = this.fetchFromList(itemsSplitBySpace[0], list, SpanMeasureItemType.specificationItem);

			if (!foundItem) {
				return acc;
			}

			return [...acc, foundItem];
		}, []);
	}

	private containsMeasureItem(measureOption: MeasureOption, measureItemOption: MeasureItemOption): boolean {
		return measureOption.measureItems.some((item) => {
			return item.description == measureItemOption.description;
		});
	}

	public async normalize(
		oVSExcelRowObjectList: OVSSpanMeasureExcelRowObject[],
		materials: object[],
		bestekposten: object[],
	): Promise<Record<string, any>> {
		const measureOptions = {};

		oVSExcelRowObjectList.forEach((element: OVSSpanMeasureExcelRowObject, index) => {
			const item = {
				id: newId(),
				description: element.Maatregelen,
				decompositionType: this.mapDecompositionType(element.Onderdelen),
				measureItems: [
					...this.parseSpecificationItems(element.Besteksposten, bestekposten),
					...this.parseMaterials(element['Materiaal uit (M)agazijn'], materials),
				],
			};

			measureOptions[item.description] = item;
		});

		// Remap object with named keys to array
		const measureOptionsArray = Array.from(Object.values(measureOptions));
		const measureItemOptions = [...materials, ...bestekposten];

		const normalizedData = {
			spanMeasureOptions: measureOptionsArray,
			spanMeasureItemOptions: measureItemOptions,
		};

		// For debugging purposes
		if (NormalizeOVSMeasureData.DEBUG) {
			await this.saveToFile(normalizedData);
		}

		return normalizedData;
	}
}
