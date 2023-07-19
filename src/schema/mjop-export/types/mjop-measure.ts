import { IMJOPDefect } from './mjop-defect';
import { IMJOPFailureMode } from './mjop-failure-mode';
import { CyclicMaintenance } from './mjop-record';

export interface IMJOPMeasure {
	maintenanceDescription: string; // Maatregel
	maintenanceType: string; // Type onderhoud
	maintenanceUnitPrice: number; // Eenheidsprijs
	maintenanceCostSurcharge: number; // Toeslag
	totalCost: number; // Totale kosten
	totalCostWithSurcharge: number; // Totale kosten incl.toeslagen
	maintenanceYear: number; // Planjaar
	defect?: IMJOPDefect;
	failureMode?: IMJOPFailureMode;
	cyclicMaintenance?: CyclicMaintenance;
}
