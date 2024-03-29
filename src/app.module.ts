import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

import { MeasureModule } from './schema/measure/measure.module';
import { FailureModeModule } from './schema/failure-mode/failure-mode.module';
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
import { HealthController } from './HealthController';
import { SurveyModule } from './schema/survey/survey.module';
import { ArkSurveyModule } from './schema/ark-survey/ark-survey.module';
import { FacadeFollowUpSurveyModule } from './schema/facade-follow-up-survey/facade-follow-up-survey.module';
import { TiModule } from './schema/ti/ti.module';
import { DefaultMaintenanceMeasureModule } from './schema/default-maintenance-measure/default-maintenance-measure.module';
import { SpanMeasuresSurveyModule } from './schema/span-measures-survey/span-measures-survey.module';
import { MJOPExportModule } from './schema/mjop-export/mjop-export.module';
import { SpanInstallationExportModule } from './api/span-installation-export/span-installation-export.module';
import { DocumentModule } from './schema/document/document.module';
import { DmsModule } from './dms/dms.module';

@Module({
	imports: [
		DocumentModule,
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
		FailureModeModule,
		SpanInstallationModule,
		SpanInstallationSurveyModule,
		SpanMeasuresSurveyModule,
		BatchModule,
		CommandModule,
		SurveyModule,
		TiModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,
			sortSchema: true,
			autoSchemaFile: true,
		}),
		TerminusModule,
		ArkSurveyModule,
		FacadeFollowUpSurveyModule,
		DefaultMaintenanceMeasureModule,
		MJOPExportModule,
		SpanInstallationExportModule,
		DmsModule,
	],
	controllers: [HealthController],
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
