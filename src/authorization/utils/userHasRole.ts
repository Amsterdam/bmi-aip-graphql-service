import { UserFromToken, Roles } from '../types';

export const userHasRole = (user: UserFromToken, role: Roles) => user.realm_access.roles.includes(role);
