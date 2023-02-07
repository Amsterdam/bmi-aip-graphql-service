import { domainDefaultMaintenanceMeasure } from '../__stubs__';

export const DefaultMaintenanceMeasureRepository = jest.fn(() => ({
	getDefaultMaintenanceMeasure: jest.fn(() => domainDefaultMaintenanceMeasure),
}));
