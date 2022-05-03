import { User } from './user.model';
import { Roles } from '../../../authorization/types';

describe('User / Model', () => {
	test('constructs a User instance object', () => {
		const user = new User();
		user.id = '9812a0c4-9cb4-4df2-b490-7a5653422f71';
		user.firstName = 'Foo';
		user.lastName = 'Bar';
		user.companyId = '17b38c11-c1f4-43ec-bac7-bd281f832de9';
		user.roles = [Roles.aip_owner];
		user.emailAddress = 'foo.bar@amsterdam.nl';

		expect(user).toEqual({
			companyId: '17b38c11-c1f4-43ec-bac7-bd281f832de9',
			emailAddress: 'foo.bar@amsterdam.nl',
			firstName: 'Foo',
			id: '9812a0c4-9cb4-4df2-b490-7a5653422f71',
			lastName: 'Bar',
			roles: [Roles.aip_owner],
		});
	});
});
