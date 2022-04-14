import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { KeycloakConfigService } from './keycloak-config.service';

@Module({
	imports: [ConfigModule],
	providers: [KeycloakConfigService],
	exports: [KeycloakConfigService],
})
export class AuthenticationModule {}
