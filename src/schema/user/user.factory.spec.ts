import { Roles } from '../../authorization/types';
import { userFromToken } from '../../authentication/__stubs__/userFromToken';

import { UserFactory } from './user.factory';
import { user } from './__stubs__/user';

describe('UserFactory', () => {
	test('constructs an instance of User from DBUser and UserFromToken', () => {
		expect(UserFactory.AggregateUser(user, userFromToken)).toEqual({
			companyId: '1aecad0d-0ae0-415a-9886-8e79e204478f',
			emailAddress: 'foo.bar@amsterdam.nl',
			firstName: 'Foo',
			id: '5915e4a2-66aa-465b-acbd-b939bbf11154',
			lastName: 'Bar',
			roles: [Roles.aip_owner],
		});
	});
});
