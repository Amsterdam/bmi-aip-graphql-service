import { Injectable } from '@nestjs/common';

import { Survey } from '../survey/models/survey.model';
import { Asset } from '../asset/models/asset.model';
import { Element } from '../decomposition/models/element.model';
import { Unit } from '../decomposition/models/unit.model';
import { UnitService } from '../decomposition/unit.service';
import { AssetService } from '../asset/asset.service';
import { ElementService } from '../decomposition/element.service';
import { DerivedConditionScore } from '../derived-condition-score/models/derived-condition-score.model';
import { MeasureService } from '../measure/measure.service';
import { DerivedConditionScoreService } from '../derived-condition-score/derived-condition-score.service';
import { CyclicMeasureService } from '../measure/cyclic-measure.service';
import { DefaultMaintenanceMeasureService } from '../default-maintenance-measure/default-maintenance-measure.service';
import { DefectService } from '../ti/defect.service';

import { MjopMeasuresService } from './mjop-measures.service';
import { MJOPRecord } from './types/mjop-record';
import { IAsset } from './types/asset';
import { ISurvey } from './types/survey';
import { IElement } from './types/element';
import { IUnit } from './types/unit';
import { IDerivedConditionScoreElement } from './types/derived-condition-score-element';
import { IDerivedConditionScoreUnit } from './types/Derived-condition-score-unit';

@Injectable()
export class MjopDataService {
	public constructor(
		private readonly assetService: AssetService,
		private readonly elementService: ElementService,
		private readonly unitService: UnitService,
		private readonly measureService: MeasureService,
		private readonly cyclicMeasureService: CyclicMeasureService,
		private readonly derivedConditionScoreService: DerivedConditionScoreService,
		private readonly defaultMaintenanceMeasureService: DefaultMaintenanceMeasureService,
		private readonly defectService: DefectService,
		private readonly getMjopMeasuresDataService: MjopMeasuresService,
	) {}

	public async getMJOPData(survey: Survey): Promise<Partial<MJOPRecord>> {
		const asset: Asset = await this.assetService.getAssetById(survey.objectId);
		const elements: Element[] = await this.elementService.getElementWithUnits(survey.id);

		const assetData: IAsset = this.getAssetProps(asset);
		const surveyData: ISurvey = this.getSurveyProps(survey);
		const elementData: IElement[] = [];
		const unitData: IUnit[] = [];

		for (const element of elements) {
			const derivedConditionScoreElements: DerivedConditionScore[] =
				await this.derivedConditionScoreService.getDerivedConditionScoresByElementId(element.id);
			const derivedConditionScoreElement = derivedConditionScoreElements.find((score) => score.unitId === null);

			const unitsWithMeasures: IUnit[] = [];

			for (const unit of element.units) {
				const derivedConditionScoreUnit = derivedConditionScoreElements.find((score) => score.unitId !== null);
				const unitProps = {
					...this.getUnitProps(unit),
					elementName: element.name, // Add the element name to the unit object
				};

				const measuresWithUnit = await this.getMjopMeasuresDataService.mapMeasures(
					await this.measureService.findMeasuresByUnitId(unit.id),
				);
				const cyclicMeasuresWithUnit = await this.getMjopMeasuresDataService.mapCyclicMeasures(
					await this.cyclicMeasureService.findCyclicMeasuresByUnitId(unit.id),
					unit.quantity,
				);

				const unitWithMeasures = {
					...unitProps,
					derivedConditionScoreUnit: this.getDerivedConditionScoreUnitProps(derivedConditionScoreUnit),
					measures: [...measuresWithUnit, ...cyclicMeasuresWithUnit], // Combine measures and cyclic measures into one array
				};

				unitsWithMeasures.push(unitWithMeasures);
				unitData.push(unitWithMeasures);
			}

			const elementWithUnits = {
				...this.getElementProps(element),
				units: unitsWithMeasures,
				derivedConditionScoreElement: this.getDerivedConditionScoreElementProps(derivedConditionScoreElement),
			};

			elementData.push(elementWithUnits);
		}

		const mjopData: Partial<MJOPRecord> = {
			asset: assetData,
			survey: {
				...surveyData,
				elements: elementData,
			},
		};

		return mjopData;
	}

	private getAssetProps(asset: Asset): IAsset {
		return {
			code: asset.code,
			assetName: asset.name,
			marineInfrastrutureType: asset.marineInfrastrutureType,
			mainMaterial: asset.mainMaterial,
		};
	}

	private getSurveyProps(survey: Survey): ISurvey {
		return {
			condition: survey.condition,
			careScore: survey.careCondition,
			craInspectionScore: survey.craInspectionScore,
		};
	}

	private getElementProps(element: Element): IElement {
		return {
			id: element.id,
			assetId: element.objectId,
			elementName: element.name,
		};
	}

	private getUnitProps(unit: Unit): IUnit {
		return {
			elementId: unit.elementId,
			unitName: unit.name,
			unitMaterial: unit.material,
			quantity: unit.quantity,
			quantityUnitOfMeasurement: unit.quantityUnitOfMeasurement,
		};
	}

	private getDerivedConditionScoreUnitProps(
		derivedConditionScore: DerivedConditionScore,
	): IDerivedConditionScoreUnit {
		return {
			unitCondition: derivedConditionScore?.score,
			unitCare: derivedConditionScore?.careScore ?? derivedConditionScore?.derivedCareScore,
			derivedUnitCare: derivedConditionScore?.derivedCareScore,
		};
	}

	private getDerivedConditionScoreElementProps(
		derivedConditionScore: DerivedConditionScore,
	): IDerivedConditionScoreElement {
		return {
			elementCondition: derivedConditionScore?.derivedScore,
			elementCare: derivedConditionScore?.derivedCareScore,
		};
	}
}
