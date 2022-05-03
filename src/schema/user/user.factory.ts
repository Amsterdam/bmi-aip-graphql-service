import { UserFromToken } from '../../authorization/types';
import { User } from './models/user.model';
import { DBUser } from './types/user.repository.interface';

export class UserFactory {
	static AggregateUser(
		{ id, emailAddress, firstName, lastName, companyId }: DBUser,
		{ realm_access: { roles } }: UserFromToken,
	): User {
		const user = new User();
		user.id = id;
		user.emailAddress = emailAddress;
		user.firstName = firstName;
		user.lastName = lastName;
		user.companyId = companyId;
		user.roles = roles;
		return user;
	}
}
