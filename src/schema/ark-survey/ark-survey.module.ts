import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { PrismaService } from 'src/prisma.service';

import { AssetModule } from '../asset/asset.module';

import { ReachSegmentRepository } from './ark-reach-segment.repository';
import { ReachSegmentResolver } from './ark-reach-segment.resolver';
import { ReachSegmentService } from './ark-reach-segment.service';
import { ArkSurveyGeographyDataRepository } from './ark-survey-geography-data.repository';
import { ArkSurveyGeographyDataResolver } from './ark-survey-geography-data.resolver';
import { ArkSurveyGeographyDataService } from './ark-survey-geography-data.service';
import { CreateArkSurveyGeographyDataHandler } from './commands/create-ark-survey-geography-data.handler';
import { CreateReachSegmentHandler } from './commands/create-reach-segment.handler';
import { DeleteArkSurveyGeographyDataHandler } from './commands/delete-ark-survey-geography-data.handler';
import { DeleteReachSegmentHandler } from './commands/delete-reach-segment.handler';
import { UpdateArkSurveyGeographyDataHandler } from './commands/update-ark-survey-geography-data.handler';
import { UpdateReachSegmentHandler } from './commands/update-reach-segment.handler';
import { FindArkSurveyGeographyDataHandler } from './queries/find-ark-survey-geography-data.handler';
import { FindReachSegmentsHandler } from './queries/find-reach-segments.handler';

@Module({
	providers: [
		ReachSegmentResolver,
		ReachSegmentService,
		ReachSegmentRepository,
		CreateReachSegmentHandler,
		UpdateReachSegmentHandler,
		DeleteReachSegmentHandler,
		FindReachSegmentsHandler,
		ArkSurveyGeographyDataResolver,
		ArkSurveyGeographyDataService,
		ArkSurveyGeographyDataRepository,
		CreateArkSurveyGeographyDataHandler,
		UpdateArkSurveyGeographyDataHandler,
		DeleteArkSurveyGeographyDataHandler,
		FindArkSurveyGeographyDataHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class ArkSurveyModule {}
