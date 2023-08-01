import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { PrismaService } from 'src/prisma.service';
import { DerivedConditionScoreModule } from 'src/derived-condition-score/derived-condition-score.module';

import { MeasureModule } from '../measure/measure.module';
import { AssetModule } from '../asset/asset.module';
import { DecompositionModule } from '../decomposition/decomposition.module';
import { SurveyModule } from '../survey/survey.module';
import { ObjectModule } from '../object/object.module';
import { DefaultMaintenanceMeasureModule } from '../default-maintenance-measure/default-maintenance-measure.module';
import { TiModule } from '../ti/ti.module';
import { FailureModeModule } from '../failure-mode/failure-mode.module';

import { MJOPDataService } from './mjop-data.service';
import { MJOPExportBySurveyIdHandler } from './queries/mjop-export-by-survey-id.handler';
import { MJOPExportBySurveyIdQuery } from './queries/mjop-export-by-survey-id.query';
import { MJOPExportByObjectIdHandler } from './queries/mjop-export-by-object-id.handler';
import { MJOPExportByObjectIdQuery } from './queries/mjop-export-by-object-id.query';
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
		MJOPExportByObjectIdHandler,
		MJOPExportByObjectIdQuery,
		MJOPExportByBatchIdHandler,
		MJOPExportByBatchIdQuery,
		Logger,
	],
	controllers: [MJOPExportController],
	imports: [
		CqrsModule,
		AuthorizationModule,
		AuthenticationModule,
		FailureModeModule,
		AssetModule,
		DecompositionModule,
		MeasureModule,
		SurveyModule,
		ObjectModule,
		DerivedConditionScoreModule,
		DefaultMaintenanceMeasureModule,
		TiModule,
	],
	exports: [MJOPDataService],
})
export class MJOPExportModule {}
