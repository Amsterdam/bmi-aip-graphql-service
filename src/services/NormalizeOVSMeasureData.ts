import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { SpanDecompositionType } from 'src/schema/span-installation/types/span-decomposition-type';
import { SpanMeasureItemType } from 'src/schema/span-installation/types/span-measure-item-type';

import { OVSSpanMeasureExcelRowObject } from './types/excelRowObject';
import { MeasureItemOption } from './types/MeasureItemOption';

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

	private formatMaterial(element: string): MeasureItemOption {
		const material = {
			id: 'MA-',
			itemType: SpanMeasureItemType.material,
			description: element ?? '',
		};

		return material;
	}

	private formatSpecificationItem(element: string): MeasureItemOption {
		const specificationItem = {
			id: 'SI-',
			itemType: SpanMeasureItemType.specificationItem,
			description: element ?? '',
		};

		return specificationItem;
	}

	private parseSpecificationItems(element: string): MeasureItemOption[] {
		if (!element) {
			return [];
		}

		const array = element.toString().split(',');
		return array.map((item, index) => {
			return this.formatSpecificationItem(item);
		});
	}

	private containsMeasureItem(measureOption: MeasureOption, measureItemOption: MeasureItemOption): boolean {
		return measureOption.measureItems.some((item) => {
			return item.description == measureItemOption.description;
		});
	}

	public async normalize(oVSExcelRowObjectList: OVSSpanMeasureExcelRowObject[]): Promise<Record<string, any>> {
		const measureOptions = {};
		const materialOptions = {};
		const specificationItemOptions = {};

		oVSExcelRowObjectList.forEach((element: OVSSpanMeasureExcelRowObject, index) => {
			const item = {
				id: 'M-' + index,
				description: element.Maatregelen,
				decompositionType: this.mapDecompositionType(element.Onderdelen),
				measureItems: [
					this.formatMaterial(element.Materiaal),
					...this.parseSpecificationItems(element.Besteksposten),
				],
			};

			// Append data if measure already known
			if (measureOptions[item.description]) {
				// Add Materialen (1 per row)
				const material = this.formatMaterial(element.Materiaal);
				measureOptions[item.description].measureItems.push(material);
				materialOptions[element.Materiaal] = material;

				// Add Bestekposten (all in one row, comma separated)
				if (element.Besteksposten) {
					const specificationItemInRow = element.Besteksposten.toString().split(',');
					specificationItemInRow.forEach((specificationItemNumber) => {
						const specificationItem = this.formatSpecificationItem(specificationItemNumber);

						if (!this.containsMeasureItem(measureOptions[item.description], specificationItem)) {
							measureOptions[item.description].measureItems.push(specificationItem);
						}
					});
				}

				return true;
			}

			measureOptions[item.description] = item;
		});

		// Remap object with named keys to array
		const measureOptionsArray = Array.from(Object.values(measureOptions));
		const measureItemOptions = Array.from(Object.values(materialOptions)).concat(
			Array.from(Object.values(specificationItemOptions)),
		);

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
