import { Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecompositionModule } from './schema/decomposition/decomposition.module';
import { PrismaService } from './prisma.service';
import { Batch as BatchModule } from './schema/batch/batch.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { KeycloakConfigService } from './authentication/keycloak-config.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './schema/user/user.module';
import { AssetModule } from './schema/asset/asset.module';
import { FileModule } from './modules/FileModule';
import { SpanInstallationModule } from './schema/span-installation/span-installation.module';
import { ObjectModule } from './schema/object/object.module';
import { SupportSystemType, SupportSystemTypeDetailed } from './schema/span-installation/types';
import { HealthController } from './HealthController';

registerEnumType(SupportSystemType, {
	name: 'SupportSystemType',
});

registerEnumType(SupportSystemTypeDetailed, {
	name: 'SupportSystemTypeDetailed',
});

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UserModule,
		AssetModule,
		HttpModule,
		KeycloakConnectModule.registerAsync({
			useExisting: KeycloakConfigService,
			imports: [AuthenticationModule],
		}),
		AuthorizationModule,
		DecompositionModule,
		SpanInstallationModule,
		ObjectModule,
		BatchModule,
		FileModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			debug: true,
			playground: true,
			sortSchema: true,
			autoSchemaFile: true,
		}),
		TerminusModule,
	],
	controllers: [AppController, HealthController],
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
