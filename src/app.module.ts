import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
// import { CaslModule } from 'nest-casl';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecompositionModule } from './schema/decomposition/decomposition.module';
import { PrismaService } from './prisma.service';
import { Batch as BatchModule } from './schema/batch/batch.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { KeycloakConfigService } from './authentication/keycloak-config.service';
import { AuthorizationModule } from './authorization/authorization.module';
// import { CaslUser, Roles, UserFromToken } from './authorization/types';
import { UserModule } from './schema/user/user.module';
// import { UserHook } from './schema/user/user.hook';
import { AssetModule } from './schema/asset/asset.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UserModule,
		AssetModule,
		// AuthenticationModule,
		KeycloakConnectModule.registerAsync({
			useExisting: KeycloakConfigService,
			imports: [AuthenticationModule],
		}),
		// CaslModule.forRoot<Roles, CaslUser, { user: UserFromToken }>({
		// 	getUserFromRequest: (request) => ({ roles: request.user.realm_access.roles, id: request.user.email }),
		// 	getUserHook: UserHook,
		// }),
		AuthorizationModule,
		DecompositionModule,
		BatchModule,
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
		AppService,
		PrismaService,
	],
})
export class AppModule {}
