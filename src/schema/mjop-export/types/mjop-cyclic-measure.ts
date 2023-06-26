import { IMJOPDefect } from './mjop-defect';
import { CyclicMaintenance } from './mjop-record';

export interface IMJOPCyclicMeasure {
	maintenanceDescription: string; // Maatregel
	maintenanceType: string; // Type onderhoud
	maintenanceCycle: number; // Cyclus
	maintenanceUnitPrice: number; // Eenheidsprijs
	maintenanceCostSurcharge: number; // Toeslag
	totalCost: number; // Totale kosten
	totalCostWithSurcharge: number; // Totale kosten incl.toeslagen
	maintenanceYear: number; // Planjaar
	defect?: IMJOPDefect;
	cyclicMaintenance?: CyclicMaintenance;
}
