import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { PrismaService } from 'src/prisma.service';

import { AssetModule } from '../asset/asset.module';

import { ArkSurveyRepository } from './ark-survey.repository';
import { ArkSurveyResolver } from './ark-survey.resolver';
import { ArkSurveyService } from './ark-survey.service';
import { CreateArkSurveyHandler } from './commands/create-ark-survey.handler';
import { CreateReachSegmentHandler } from './commands/create-reach-segment.handler';
import { DeleteArkSurveyHandler } from './commands/delete-ark-survey.handler';
import { DeleteReachSegmentHandler } from './commands/delete-reach-segment.handler';
import { FindArkSurveyReachSegmentsHandler } from './commands/find-ark-survey-reach-segments.handler';
import { SaveArkSurveyHandler } from './commands/save-ark-survey.handler';
import { UpdateArkSurveyHandler } from './commands/update-ark-survey.handler';
import { FindArkSurveyHandler } from './queries/find-ark-survey.handler';
import { UpdateReachSegmentHandler } from './commands/update-reach-segment.handler';
import { FindReachSegmentsHandler } from './queries/find-reach-segments.handler';
import { GetArkSurveyBySurveyIdHandler } from './queries/get-ark-survey-by-survey.handler';
import { ReachSegmentRepository } from './reach-segment.repository';
import { ReachSegmentResolver } from './reach-segment.resolver';
import { ReachSegmentService } from './reach-segment.service';

@Module({
	providers: [
		ArkSurveyResolver,
		ArkSurveyService,
		ArkSurveyRepository,
		CreateArkSurveyHandler,
		UpdateArkSurveyHandler,
		DeleteArkSurveyHandler,
		SaveArkSurveyHandler,
		FindArkSurveyHandler,
		ReachSegmentService,
		ReachSegmentRepository,
		GetArkSurveyBySurveyIdHandler,
		FindArkSurveyReachSegmentsHandler,
		PrismaService,
		ReachSegmentResolver,
		ReachSegmentService,
		ReachSegmentRepository,
		CreateReachSegmentHandler,
		UpdateReachSegmentHandler,
		DeleteReachSegmentHandler,
		FindReachSegmentsHandler,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class ArkSurveyModule {}
