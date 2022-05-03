import { UserFromToken, Roles } from '../../authorization/types';

export const loggedInUser: UserFromToken = {
	email: 'foo.bar@amsterdam.nl',
	realm_access: {
		roles: [Roles.aip_owner],
	},
	family_name: 'Bar',
	given_name: 'Foo',
	name: 'Foo Bar',
	preferred_username: 'foomanshoo',
};
