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
import { DeleteArkSurveyHandler } from './commands/delete-ark-survey.handler';
import { SaveArkSurveyHandler } from './commands/save-ark-survey.handler';
import { UpdateArkSurveyHandler } from './commands/update-ark-survey.handler';
import { FindArkSurveyHandler } from './queries/find-ark-survey.handler';

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
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class ArkSurveyModule {}
