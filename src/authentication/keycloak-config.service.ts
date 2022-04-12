import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, TokenValidation } from 'nest-keycloak-connect';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
	constructor(private configService: ConfigService) {}

	createKeycloakConnectOptions(): KeycloakConnectOptions {
		// return {
		// 	authServerUrl: 'https://iam.amsterdam.nl/auth',
		// 	realm: 'BMI-acc',
		// 	clientId: 'aip-graphql-service',
		// 	secret: 'fd1cb8b6-b2d4-4831-b986-a0d82ee33ad1',
		// };
		return {
			authServerUrl: this.configService.get<string>('KEYCLOAK_URL'),
			realm: this.configService.get<string>('KEYCLOAK_REALM'),
			clientId: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
			secret: this.configService.get<string>('KEYCLOAK_SECRET_KEY'),
			// cookieKey: 'KEYCLOAK_JWT',

			logLevels: ['debug'],
			// useNestLogger: false,
			// policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
			tokenValidation:
				this.configService.get<TokenValidation>('KEYCLOAK_TOKEN_VALIDATION') ?? TokenValidation.ONLINE,
		};
	}
}
