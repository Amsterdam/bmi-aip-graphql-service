import { Request } from 'express';

import { AppAbility } from '../casl-ability.factory';

export interface IPolicyHandler {
	handle(ability: AppAbility, request: Request, args: Record<string, unknown>): boolean;
}
export type PolicyHandlerCallback = (ability: AppAbility, request: Request, args: Record<string, unknown>) => boolean;
export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export enum Action {
	Read = 'read',
	Write = 'write',
	Partial = 'partial',
	Manage = 'manage',
	Create = 'create',
	Update = 'update',
	Delete = 'delete',
}

export enum Roles {
	aip_client = 'aip_client',
	aip_config = 'aip_config',
	aip_accou = 'aip_accou',
	aip_contract = 'aip_contract',
	aip_admin = 'aip_admin',
	aip_owner = 'aip_owner',
	aip_operat = 'aip_operat',
	aip_survey = 'aip_survey',
	aip_editor = 'aip_editor',
}

// This represents the user object that comes from unpacking the KC user from the bearer token (nest-keycloak-connect)
export type UserFromToken = {
	name: string;
	preferred_username: string;
	given_name: string;
	family_name: string;
	email: string;
	realm_access: {
		roles: Roles[];
	};
};
