import { CyclicMeasureTypes } from '../types/cyclic-measure';

export const castCyclicMeasureType = (maintenanceType: string): CyclicMeasureTypes => {
	switch (maintenanceType) {
		case 'Groot onderhoud':
			return CyclicMeasureTypes.MajorMaintenance;
		case 'Dagelijksonderhoud':
			return CyclicMeasureTypes.DailyMaintenance;
		case 'Vervangen':
			return CyclicMeasureTypes.ToReplace;
		default:
			return <CyclicMeasureTypes>maintenanceType;
	}
};
