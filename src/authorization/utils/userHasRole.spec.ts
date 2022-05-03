import { userHasRole } from './userHasRole';
import { Roles } from '../types';
import { loggedInUser } from '../../authentication/__stubs__/loggedInUser';

describe('userHasRole()', () => {
	test('Returns true if user matches role', () => {
		expect(userHasRole(loggedInUser, Roles.aip_owner)).toBe(true);
	});

	test('Returns false if user does NOT match role', () => {
		expect(userHasRole(loggedInUser, Roles.aip_survey)).toBe(false);
	});
});
