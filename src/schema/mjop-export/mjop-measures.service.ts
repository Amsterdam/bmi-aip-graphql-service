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
		const cyclicMaintenance: CyclicMaintenance = {};

		for (const measure of measures) {
			const defect: Defect | null = measure.defectId
				? await this.defectService.getDefect(measure.defectId)
				: null;
			const failureMode: FailureMode | null = measure.failureModeId
				? await this.failureModeService.getFailureMode(measure.failureModeId)
				: null;

			const mappedMeasure = {
				...this.getMeasureProps(measure),
				defect: {
					...(defect ? this.getDefectProps(defect) : null),
				},
				failureMode: failureMode ? this.getFailureModeProps(failureMode) : null,
				cyclicMaintenance,
			};
			cyclicMaintenance['year' + measure.planYear.toString()] = mappedMeasure.totalCost; //measure.quantity * measure.unitPrice;

			mappedMeasures.push(mappedMeasure);
		}

		return mappedMeasures;
	}

	public async mapCyclicMeasures(
		cyclicMeasures: CyclicMeasure[],
		unitQuantity: number,
	): Promise<IMJOPCyclicMeasure[]> {
		const mappedCyclicMeasures: IMJOPCyclicMeasure[] = [];

		for (const cyclicMeasure of cyclicMeasures) {
			const defaultMaintenanceMeasure: DefaultMaintenanceMeasure =
				await this.defaultMaintenanceMeasureService.getDefaultMaintenanceMeasure(
					cyclicMeasure.defaultMaintenanceMeasureId,
				);
			const failureMode: FailureMode | null = cyclicMeasure.failureModeId
				? await this.failureModeService.getFailureMode(cyclicMeasure.failureModeId)
				: null;

			const cyclicMaintenance: CyclicMaintenance = {};

			const mappedCyclicMeasure = {
				...this.getCyclicMeasureProps(cyclicMeasure, defaultMaintenanceMeasure.description, unitQuantity),
				failureMode: failureMode ? this.getFailureModeProps(failureMode) : null,
				cyclicMaintenance,
			};

			// Number of years to plot in the exported file
			const amountOfYearsPlotted = 20;

			for (let i = 0; i <= amountOfYearsPlotted; i++) {
				const yearNumber = new Date().getFullYear();
				const currentYear = yearNumber + i;

				if (cyclicMeasure.planYear === currentYear) {
					cyclicMaintenance['year' + cyclicMeasure.planYear.toString()] =
						mappedCyclicMeasure.totalCostWithSurcharge;
				} else if (cyclicMeasure.cycle && cyclicMeasure.cycle <= amountOfYearsPlotted) {
					// Maximum number of maintenance cycles to consider
					const maxMaintenanceCycles = 120;
					for (let j = 0; j <= maxMaintenanceCycles - i; j++) {
						const maintenCycleYear = Math.ceil(cyclicMeasure.planYear + cyclicMeasure.cycle * j);
						if (cyclicMeasure.cycle < 1) {
							cyclicMaintenance['year' + maintenCycleYear.toString()] =
								mappedCyclicMeasure.totalCostWithSurcharge / cyclicMeasure.cycle;
						} else {
							cyclicMaintenance['year' + maintenCycleYear.toString()] =
								mappedCyclicMeasure.totalCostWithSurcharge;
						}
					}
				}
			}

			mappedCyclicMeasures.push(mappedCyclicMeasure);
		}

		return mappedCyclicMeasures;
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
