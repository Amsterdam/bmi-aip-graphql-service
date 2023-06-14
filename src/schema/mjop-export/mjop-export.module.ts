import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';
import { MeasureModule } from '../measure/measure.module';
import { AssetModule } from '../asset/asset.module';
import { DecompositionModule } from '../decomposition/decomposition.module';
import { SurveyModule } from '../survey/survey.module';
import { DerivedConditionScoreModule } from '../derived-condition-score/derived-condition-score.module';
import { DefaultMaintenanceMeasureModule } from '../default-maintenance-measure/default-maintenance-measure.module';
import { TiModule } from '../ti/ti.module';
import { FailureModeModule } from '../failure-mode/failure-mode.module';

import { MjopDataService } from './mjop-data.service';
import { MjopExportBySurveyIdHandler } from './queries/mjop-export-by-survey-id.handler';
import { MjopExportBySurveyIdQuery } from './queries/mjop-export-by-survey-id.query';
import { MjopMeasuresService } from './mjop-measures.service';
import { AddMjopSheetService } from './mjop-report-survey/add-mjop-sheet.service';
import { MjopExportController } from './mjop-export.controller';

@Module({
	providers: [
		PrismaService,
		AddMjopSheetService,
		MjopDataService,
		MjopMeasuresService,
		MjopExportController,
		MjopExportBySurveyIdHandler,
		MjopExportBySurveyIdQuery,
	],
	controllers: [MjopExportController],
	imports: [
		CqrsModule,
		AuthorizationModule,
		AuthenticationModule,
		FailureModeModule,
		forwardRef(() => AssetModule),
		forwardRef(() => DecompositionModule),
		forwardRef(() => MeasureModule),
		forwardRef(() => SurveyModule),
		forwardRef(() => DerivedConditionScoreModule),
		forwardRef(() => DefaultMaintenanceMeasureModule),
		forwardRef(() => TiModule),
	],
	exports: [MjopDataService],
})
export class MjopExportModule {}
