import { Roles } from '../../../authorization/types';

export class User {
	id: string;

	roles: Roles[];

	emailAddress: string;

	firstName?: string;

	lastName: string;

	companyId: string;
}
