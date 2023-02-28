import { objectTypeUnitCode } from '../../decomposition/__stubs__';

export const ObjectTypeUnitCodeService = jest.fn(() => ({
	getObjectTypeUnitCodeByCode: jest.fn(() => objectTypeUnitCode),
}));
