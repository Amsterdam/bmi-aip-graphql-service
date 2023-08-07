import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AssetModule } from '../asset/asset.module';
import { PrismaService } from '../../prisma.service';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';

import { ArkSurveyRepository } from './ark-survey.repository';
import { ArkSurveyResolver } from './ark-survey.resolver';
import { ArkSurveyService } from './ark-survey.service';
import { CreateArkSurveyHandler } from './commands/create-ark-survey.handler';
import { CreateReachSegmentHandler } from './commands/create-reach-segment.handler';
import { DeleteArkSurveyHandler } from './commands/delete-ark-survey.handler';
import { DeleteReachSegmentHandler } from './commands/delete-reach-segment.handler';
import { FindArkSurveyReachSegmentsHandler } from './queries/find-ark-survey-reach-segments.handler';
import { SaveArkSurveyHandler } from './commands/save-ark-survey.handler';
import { UpdateArkSurveyHandler } from './commands/update-ark-survey.handler';
import { UpdateReachSegmentHandler } from './commands/update-reach-segment.handler';
import { FindReachSegmentsHandler } from './queries/find-reach-segments.handler';
import { GetArkSurveyBySurveyIdHandler } from './queries/get-ark-survey-by-survey.handler';
import { ReachSegmentRepository } from './reach-segment.repository';
import { ReachSegmentService } from './reach-segment.service';
import { SaveArkCompletionHandler } from './commands/save-ark-completion.handler';
import { ArkSurveyController } from './ark-survey.controller';
import { FindArkSurveysByAssetCodeHandler } from './queries/find-ark-surveys-by-asset-code.handler';

@Module({
	providers: [
		ArkSurveyResolver,
		ArkSurveyService,
		ArkSurveyRepository,
		CreateArkSurveyHandler,
		UpdateArkSurveyHandler,
		DeleteArkSurveyHandler,
		SaveArkSurveyHandler,
		SaveArkCompletionHandler,
		ReachSegmentService,
		ReachSegmentRepository,
		GetArkSurveyBySurveyIdHandler,
		FindArkSurveyReachSegmentsHandler,
		PrismaService,
		ReachSegmentService,
		ReachSegmentRepository,
		CreateReachSegmentHandler,
		UpdateReachSegmentHandler,
		DeleteReachSegmentHandler,
		FindReachSegmentsHandler,
		FindArkSurveysByAssetCodeHandler,
	],
	controllers: [ArkSurveyController],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class ArkSurveyModule {}
