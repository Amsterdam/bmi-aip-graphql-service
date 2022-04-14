import { Injectable } from '@nestjs/common';
import {
	KeycloakConnectOptions,
	KeycloakConnectOptionsFactory,
	PolicyEnforcementMode,
	TokenValidation,
} from 'nest-keycloak-connect';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
	constructor(private configService: ConfigService) {}

	createKeycloakConnectOptions(): KeycloakConnectOptions {
		return {
			authServerUrl: this.configService.get<string>('KEYCLOAK_URL'),
			realm: this.configService.get<string>('KEYCLOAK_REALM'),
			clientId: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
			secret: this.configService.get<string>('KEYCLOAK_SECRET_KEY'),
			bearerOnly: true,
			useNestLogger: true,
			policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
			tokenValidation:
				this.configService.get<TokenValidation>('KEYCLOAK_TOKEN_VALIDATION') ?? TokenValidation.ONLINE,
		};
	}
}
