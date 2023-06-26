import { Injectable } from '@nestjs/common';
import { DerivedConditionScore } from 'src/derived-condition-score/models/derived-condition-score.model';
import { DerivedConditionScoreService } from 'src/derived-condition-score/derived-condition-score.service';

import { Survey } from '../survey/models/survey.model';
import { Asset } from '../asset/models/asset.model';
import { Element } from '../decomposition/models/element.model';
import { Unit } from '../decomposition/models/unit.model';
import { UnitService } from '../decomposition/unit.service';
import { AssetService } from '../asset/asset.service';
import { ElementService } from '../decomposition/element.service';
import { MeasureService } from '../measure/measure.service';
import { CyclicMeasureService } from '../measure/cyclic-measure.service';
import { DefaultMaintenanceMeasureService } from '../default-maintenance-measure/default-maintenance-measure.service';
import { DefectService } from '../ti/defect.service';

import { MJOPMeasuresService } from './mjop-measures.service';
import { MJOPRecord } from './types/mjop-record';
import { IMJOPAsset } from './types/mjop-asset';
import { IMJOPSurvey } from './types/mjop-survey';
import { IMJOPElement } from './types/mjop-element';
import { IMJOPUnit } from './types/mjop-unit';
import { IMJOPDerivedConditionScoreElement } from './types/mjop-derived-condition-score-element';
import { IMJOPDerivedConditionScoreUnit } from './types/mjop-derived-condition-score-unit';

@Injectable()
export class MJOPDataService {
	public constructor(
		private readonly assetService: AssetService,
		private readonly elementService: ElementService,
		private readonly unitService: UnitService,
		private readonly measureService: MeasureService,
		private readonly cyclicMeasureService: CyclicMeasureService,
		private readonly derivedConditionScoreService: DerivedConditionScoreService,
		private readonly defaultMaintenanceMeasureService: DefaultMaintenanceMeasureService,
		private readonly defectService: DefectService,
		private readonly getMjopMeasuresDataService: MJOPMeasuresService,
	) {}

	public async getMJOPData(survey: Survey): Promise<Partial<MJOPRecord>> {
		const asset: Asset = await this.assetService.getAssetById(survey.objectId);
		const elements: Element[] = await this.elementService.getElementWithUnits(survey.id);

		const assetData: IMJOPAsset = this.getAssetProps(asset);
		const surveyData: IMJOPSurvey = this.getSurveyProps(survey);

		const elementData: IMJOPElement[] = await Promise.all(
			elements.map(async (element) => this.processElement(element)),
		);

		const mjopData: Partial<MJOPRecord> = {
			asset: assetData,
			survey: {
				...surveyData,
				elements: elementData,
			},
		};

		return mjopData;
	}

	private async processElement(element: Element): Promise<IMJOPElement> {
		const derivedConditionScoreElements: DerivedConditionScore[] =
			await this.derivedConditionScoreService.getDerivedConditionScoresByElementId(element.id);
		const derivedConditionScoreElement = derivedConditionScoreElements.find((score) => score.unitId === null);

		const unitsWithMeasures: IMJOPUnit[] = await Promise.all(
			element.units.map(async (unit) => this.processUnit(unit, element)),
		);

		return {
			...this.getElementProps(element),
			units: unitsWithMeasures,
			derivedConditionScoreElement: this.getDerivedConditionScoreElementProps(derivedConditionScoreElement),
		};
	}

	private async processUnit(unit: Unit, element: Element): Promise<IMJOPUnit> {
		const derivedConditionScoreElements: DerivedConditionScore[] =
			await this.derivedConditionScoreService.getDerivedConditionScoresByElementId(element.id);
		const derivedConditionScoreUnit = derivedConditionScoreElements.find((score) => score.unitId !== null);

		const unitProps: IMJOPUnit = {
			...this.getUnitProps(unit),
			elementName: element.name,
		};

		const measuresWithUnit = await this.getMjopMeasuresDataService.mapMeasures(
			await this.measureService.findMeasuresByUnitId(unit.id),
		);
		const cyclicMeasuresWithUnit = await this.getMjopMeasuresDataService.mapCyclicMeasures(
			await this.cyclicMeasureService.findCyclicMeasuresByUnitId(unit.id),
			unit.quantity,
		);

		return {
			...unitProps,
			derivedConditionScoreUnit: this.getDerivedConditionScoreUnitProps(derivedConditionScoreUnit),
			measures: [...measuresWithUnit, ...cyclicMeasuresWithUnit],
		};
	}

	private getAssetProps({ code, name, marineInfrastrutureType, mainMaterial }: Asset): IMJOPAsset {
		return { code, assetName: name, marineInfrastrutureType, mainMaterial };
	}

	private getSurveyProps({ condition, careCondition, craInspectionScore }: Survey): IMJOPSurvey {
		return {
			condition,
			careScore: careCondition,
			craInspectionScore,
		};
	}

	private getElementProps(element: Element): IMJOPElement {
		return {
			id: element.id,
			assetId: element.objectId,
			elementName: element.name,
		};
	}

	private getUnitProps(unit: Unit): IMJOPUnit {
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
	): IMJOPDerivedConditionScoreUnit {
		return {
			unitCondition: derivedConditionScore?.score,
			unitCare: derivedConditionScore?.careScore ?? derivedConditionScore?.derivedCareScore,
			derivedUnitCare: derivedConditionScore?.derivedCareScore,
		};
	}

	private getDerivedConditionScoreElementProps(
		derivedConditionScore: DerivedConditionScore,
	): IMJOPDerivedConditionScoreElement {
		return {
			elementCondition: derivedConditionScore?.derivedScore,
			elementCare: derivedConditionScore?.derivedCareScore,
		};
	}
}
