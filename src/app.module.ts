import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

import { MeasureModule } from './schema/measure/measure.module';
import { CyclicMeasureModule } from './schema/cyclic-measure/cyclic-measure.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecompositionModule } from './schema/decomposition/decomposition.module';
import { PrismaService } from './prisma.service';
import { BatchModule } from './schema/batch/batch.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { KeycloakConfigService } from './authentication/keycloak-config.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './schema/user/user.module';
import { AssetModule } from './schema/asset/asset.module';
import { CommandModule } from './command/command.module';
import { SpanInstallationModule } from './schema/span-installation/span-installation.module';
import { SpanInstallationSurveyModule } from './schema/span-installation-survey/span-installation-survey.module';
import { ObjectModule } from './schema/object/object.module';
import { HealthController } from './HealthController';
import { SurveyModule } from './schema/survey/survey.module';
import { ReachSegmentModule } from './schema/reach-segment/reach-segment.module';
import { ArkSurveyGeographyDataModule } from './schema/ark-survey/ark-survey-geography-data.module';

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
		MeasureModule,
		CyclicMeasureModule,
		SpanInstallationModule,
		SpanInstallationSurveyModule,
		ObjectModule,
		BatchModule,
		CommandModule,
		SurveyModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			debug: true,
			playground: true,
			sortSchema: true,
			autoSchemaFile: true,
		}),
		TerminusModule,
		ReachSegmentModule,
		ArkSurveyGeographyDataModule,
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
		Logger,
	],
})
export class AppModule {}
