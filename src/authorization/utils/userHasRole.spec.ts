import { Roles } from '../types';
import { userFromToken } from '../../authentication/__stubs__/userFromToken';

import { userHasRole } from './userHasRole';

describe('userHasRole()', () => {
	test('Returns true if user matches role', () => {
		expect(userHasRole(userFromToken, Roles.aip_owner)).toBe(true);
	});

	test('Returns false if user does NOT match role', () => {
		expect(userHasRole(userFromToken, Roles.aip_survey)).toBe(false);
	});
});
