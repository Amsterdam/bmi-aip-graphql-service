import { defaultMaintenanceMeasure } from '../__stubs__';

export const DefaultMaintenanceMeasureService = jest.fn(() => ({
	getDefaultMaintenanceMeasure: jest.fn(() => defaultMaintenanceMeasure),
}));
