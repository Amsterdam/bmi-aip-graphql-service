import { domainObjectTypeUnitCode } from '../../decomposition/__stubs__';

export const ObjectTypeUnitCodeRepository = jest.fn(() => ({
	findByCode: jest.fn().mockResolvedValue(domainObjectTypeUnitCode),
}));
