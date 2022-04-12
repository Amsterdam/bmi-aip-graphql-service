import { Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule],
	providers: [KeycloakConfigService],
	exports: [KeycloakConfigService],
})
export class AuthenticationModule {}
