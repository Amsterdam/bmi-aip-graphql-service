import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecompositionModule } from './schema/decomposition/decomposition.module';
// import { KeycloakConfigService } from './authentication/keycloak-config.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { KeycloakConfigService } from './authentication/keycloak-config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		// AuthenticationModule,
		KeycloakConnectModule.registerAsync({
			useExisting: KeycloakConfigService,
			imports: [AuthenticationModule],
			// imports: [ConfigService],
			inject: [ConfigService, Reflector],
		}),
		DecompositionModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			debug: true,
			playground: true,
			sortSchema: true,
			autoSchemaFile: true,
		}),
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: ResourceGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RoleGuard,
		},
		// KeycloakConfigService,
		AppService,
	],
})
export class AppModule {}
