import { Injectable } from '@nestjs/common';

import { MeasureService } from '../measure/measure.service';
import { DefaultMaintenanceMeasureService } from '../default-maintenance-measure/default-maintenance-measure.service';
import { DefectService } from '../ti/defect.service';
import { CyclicMeasureService } from '../measure/cyclic-measure.service';
import { Measure } from '../measure/models/measure.model';
import { Defect } from '../ti/models/defect.model';
import { CyclicMeasure } from '../measure/models/cyclic-measure.model';
import { DefaultMaintenanceMeasure } from '../default-maintenance-measure/models/default-maintenance-measure.model';
import { FailureMode } from '../failure-mode/models/failure-mode.model';
import { FailureModeService } from '../failure-mode/failure-mode.service';

import { IMJOPMeasure } from './types/mjop-measure';
import { IMJOPCyclicMeasure } from './types/mjop-cyclic-measure';
import { IMJOPDefect } from './types/mjop-defect';
import { IMJOPFailureMode } from './types/mjop-failure-mode';
import { CyclicMaintenance } from './types/mjop-record';

@Injectable()
export class MJOPMeasuresService {
	constructor(
		private readonly measureService: MeasureService,
		private readonly cyclicMeasureService: CyclicMeasureService,
		private readonly defectService: DefectService,
		private readonly defaultMaintenanceMeasureService: DefaultMaintenanceMeasureService,
		private readonly failureModeService: FailureModeService,
	) {}

	public async mapMeasures(measures: Measure[]): Promise<IMJOPMeasure[]> {
		const mappedMeasures: IMJOPMeasure[] = [];

		for (const measure of measures) {
			const defectPromise: Promise<Defect | null> = measure.defectId
				? this.defectService.getDefect(measure.defectId)
				: Promise.resolve(null);
			const failureModePromise: Promise<FailureMode | null> = measure.failureModeId
				? this.failureModeService.getFailureMode(measure.failureModeId)
				: Promise.resolve(null);

			const [defect, failureMode] = await Promise.all([defectPromise, failureModePromise]);

			const cyclicMaintenance: CyclicMaintenance = {
				['year' + measure.planYear.toString()]: measure.quantity * measure.unitPrice,
			};

			const mappedMeasure: IMJOPMeasure = {
				...this.getMeasureProps(measure),
				defect: defect ? this.getDefectProps(defect) : null,
				failureMode: failureMode ? this.getFailureModeProps(failureMode) : null,
				cyclicMaintenance,
			};

			mappedMeasures.push(mappedMeasure);
		}

		return mappedMeasures;
	}

	public async mapCyclicMeasures(
		cyclicMeasures: CyclicMeasure[],
		unitQuantity: number,
	): Promise<IMJOPCyclicMeasure[]> {
		// Number of years to plot in the exported file
		const amountOfYearsPlotted = 20;

		return Promise.all(
			cyclicMeasures.map(async (cyclicMeasure) => {
				const defaultMaintenanceMeasure: DefaultMaintenanceMeasure =
					await this.defaultMaintenanceMeasureService.getDefaultMaintenanceMeasure(
						cyclicMeasure.defaultMaintenanceMeasureId,
					);
				const failureMode: FailureMode = cyclicMeasure.failureModeId
					? await this.failureModeService.getFailureMode(cyclicMeasure.failureModeId)
					: null;

				const mappedCyclicMeasure = {
					...this.getCyclicMeasureProps(cyclicMeasure, defaultMaintenanceMeasure.description, unitQuantity),
					failureMode: failureMode ? this.getFailureModeProps(failureMode) : null,
					cyclicMaintenance: {},
				};

				if (cyclicMeasure.planYear === new Date().getFullYear()) {
					mappedCyclicMeasure.cyclicMaintenance['year' + cyclicMeasure.planYear.toString()] =
						mappedCyclicMeasure.totalCostWithSurcharge;
				} else if (cyclicMeasure.cycle && cyclicMeasure.cycle <= amountOfYearsPlotted) {
					// Maximum number of maintenance cycles to consider
					const maxMaintenanceCycles = 120;
					mappedCyclicMeasure.cyclicMaintenance = Array.from({ length: maxMaintenanceCycles }).reduce(
						(cyclicMaintenance, _, index) => {
							const maintenanceCycleYear = Math.ceil(
								cyclicMeasure.planYear + cyclicMeasure.cycle * index,
							);
							const cost =
								cyclicMeasure.cycle < 1
									? mappedCyclicMeasure.totalCostWithSurcharge / cyclicMeasure.cycle
									: mappedCyclicMeasure.totalCostWithSurcharge;

							cyclicMaintenance['year' + maintenanceCycleYear.toString()] = cost;

							return cyclicMaintenance;
						},
						{},
					);
				}

				return mappedCyclicMeasure;
			}),
		);
	}

	private getMeasureProps(measure: Measure): IMJOPMeasure {
		return {
			maintenanceDescription: measure.description,
			maintenanceType: measure.maintenanceType,
			maintenanceUnitPrice: measure.unitPrice,
			maintenanceCostSurcharge: measure.costSurcharge,
			totalCost: measure.unitPrice * measure.quantity,
			totalCostWithSurcharge:
				measure.unitPrice *
				measure.quantity *
				(measure.costSurcharge ? parseFloat(String(measure.costSurcharge)) : 1),
			maintenanceYear: measure.planYear,
		};
	}

	private getCyclicMeasureProps(
		cyclicMeasure: CyclicMeasure,
		description: string,
		unitQuantity: number,
	): IMJOPCyclicMeasure {
		return {
			maintenanceDescription: description,
			maintenanceType: cyclicMeasure.maintenanceType,
			maintenanceCycle: cyclicMeasure.cycle,
			maintenanceUnitPrice: cyclicMeasure.unitPrice,
			maintenanceCostSurcharge: cyclicMeasure.costSurcharge,
			totalCost: cyclicMeasure.unitPrice * unitQuantity,
			totalCostWithSurcharge:
				cyclicMeasure.unitPrice *
				unitQuantity *
				(cyclicMeasure.costSurcharge ? parseFloat(String(cyclicMeasure.costSurcharge)) : 1),
			maintenanceYear: cyclicMeasure.planYear,
		};
	}

	private getFailureModeProps(failureMode: FailureMode): IMJOPFailureMode {
		return {
			failureModeName: failureMode.customName,
			faaloorzaak: failureMode?.metaData?.failureCause,
			bronVanFalen: failureMode?.metaData?.sourceOfFailure,
			gevolgVanFalen: failureMode?.metaData?.consequenceOfFailure,
			analysisRemarks: failureMode.analysisRemarks,
			verificationRemarks: failureMode.verificationRemarks,
			maintenanceRemarks: failureMode.maintenanceRemarks,
			verificationRamsR: failureMode.verificationRamsR,
			verificationRamsA: failureMode.verificationRamsA,
			verificationRamsS: failureMode.verificationRamsS,
			verificationRamsC: failureMode.verificationRamsC,
			verificationRamsEc: failureMode.verificationRamsEc,
			verificationRamsEnv: failureMode.verificationRamsEnv,
			verificationRamsP: failureMode.verificationRamsP,
			verificationRamsWeightedPriority: failureMode.verificationRamsWeightedPriority,
		};
	}

	private getDefectProps(defect: Defect): IMJOPDefect {
		if (defect === null) {
			return;
		} else
			return {
				defectName: defect.name,
				seriousness: defect.seriousness,
				intensity: defect.intensity,
				extend: defect.extend,
				repairAdvice: defect.repairAdvice,
				defectScore: defect.score,
				defectCareScore: defect.careScore,
				ramsR: defect.ramsR,
				ramsA: defect.ramsA,
				ramsS: defect.ramsS,
				ramsEc: defect.ramsEc,
				ramsEnv: defect.ramsEnv,
				ramsTotalPriority: defect.ramsTotalPriority,
				ramsWeightedPriority: defect.ramsTotalPriority,
			};
	}
}
