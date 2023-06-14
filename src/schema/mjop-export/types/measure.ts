import { IDefect } from './defect';
import { IFailureMode } from './failure-mode';
import { CyclicMaintenance } from './mjop-record';

export interface IMeasure {
	maintenanceDescription: string; //'Maatregel'
	maintenanceType: string; //'Type onderhoud'
	maintenanceUnitPrice: number; //'Eenheidsprijs'
	maintenanceCostSurcharge: number; //'Toeslag'
	totalCost: number; //'Totale kosten'
	totalCostWithSurcharge: number; //'Totale kosten incl.toeslagen'
	maintenanceYear: number; //'Planjaar'
	defect?: IDefect;
	failureMode?: IFailureMode;
	cyclicMaintenance?: CyclicMaintenance;
}
