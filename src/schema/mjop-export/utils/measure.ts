export function MeasureTypes(value) {
	switch (value) {
		case 'CorrectiveMaintenance':
			return 'Correctief onderhoud';
		case 'PreventiveMaintenance':
			return 'Preventief onderhoud';
		case 'MajorMaintenance':
			return 'Groot onderhoud';
		case 'DailyMaintenance':
			return 'Dagelijksonderhoud';
		case 'ToReplace':
			return 'Vervangen';
		default:
			return 'Correctief onderhoud';
	}
}
