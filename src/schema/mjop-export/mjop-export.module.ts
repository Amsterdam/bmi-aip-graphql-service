import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { PrismaService } from 'src/prisma.service';

import { MeasureModule } from '../measure/measure.module';
import { AssetModule } from '../asset/asset.module';
import { DecompositionModule } from '../decomposition/decomposition.module';
import { SurveyModule } from '../survey/survey.module';
import { DerivedConditionScoreModule } from '../derived-condition-score/derived-condition-score.module';
import { DefaultMaintenanceMeasureModule } from '../default-maintenance-measure/default-maintenance-measure.module';
import { TiModule } from '../ti/ti.module';
import { FailureModeModule } from '../failure-mode/failure-mode.module';

import { MJOPDataService } from './mjop-data.service';
import { MJOPExportBySurveyIdHandler } from './queries/mjop-export-by-survey-id.handler';
import { MJOPExportBySurveyIdQuery } from './queries/mjop-export-by-survey-id.query';
import { MJOPMeasuresService } from './mjop-measures.service';
import { AddMJOPSheetService } from './add-mjop-sheet.service';
import { MJOPExportController } from './mjop-export.controller';
import { MJOPExportByBatchIdHandler } from './queries/mjop-export-by-batch-id.handler';
import { MJOPExportByBatchIdQuery } from './queries/mjop-export-by-batch-id.query';

@Module({
	providers: [
		PrismaService,
		AddMJOPSheetService,
		MJOPDataService,
		MJOPMeasuresService,
		MJOPExportController,
		MJOPExportBySurveyIdHandler,
		MJOPExportBySurveyIdQuery,
		MJOPExportByBatchIdHandler,
		MJOPExportByBatchIdQuery,
	],
	controllers: [MJOPExportController],
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
	exports: [MJOPDataService],
})
export class MjopExportModule {}
