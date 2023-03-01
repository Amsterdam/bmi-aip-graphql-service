import { domainObjectTypeUnitCode } from '../__stubs__';

import { ObjectTypeUnitCode } from './object-type-unit-code.model';

describe('Decomposition / Model / ObjectTypeUnitCode', () => {
	test('constructs a ObjectTypeUnitCode instance object', () => {
		const objectTypeUnitCode = Object.keys(domainObjectTypeUnitCode).reduce((model, key) => {
			model[key] = domainObjectTypeUnitCode[key];
			return model;
		}, new ObjectTypeUnitCode());

		expect(objectTypeUnitCode).toBeInstanceOf(ObjectTypeUnitCode);
		expect(objectTypeUnitCode).toEqual(domainObjectTypeUnitCode);
	});
});
