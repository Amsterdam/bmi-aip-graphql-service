import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { PrismaService } from 'src/prisma.service';

import { AssetModule } from '../asset/asset.module';

import { FacadeSurveyRepository } from './facade-survey.repository';
import { FacadeSurveyResolver } from './facade-survey.resolver';
import { FacadeSurveyService } from './facade-survey.service';
import { CreateFacadeSurveyHandler } from './commands/create-facade-survey.handler';
import { DeleteFacadeSurveyHandler } from './commands/delete-facade-survey.handler';
import { UpdateFacadeSurveyHandler } from './commands/update-facade-survey.handler';
import { GetFacadeSurveyBySurveyIdHandler } from './queries/get-facade-survey-by-survey.handler';

@Module({
	providers: [
		FacadeSurveyService,
		FacadeSurveyRepository,
		FacadeSurveyResolver,
		CreateFacadeSurveyHandler,
		UpdateFacadeSurveyHandler,
		DeleteFacadeSurveyHandler,
		GetFacadeSurveyBySurveyIdHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class ArkSurveyModule {}
