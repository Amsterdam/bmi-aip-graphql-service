import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';

import { TensionWireSurveyResolver } from './tension-wire-survey.resolver';
import { TensionWireSurveyService } from './tension-wire-survey.service';
import { TensionWireSurveyRepository } from './tension-wire-survey.repository';
import { GetTensionWireSurveyHandler } from './queries/get-tension-wire-survey.handler';
import { GetTensionWireSurveyQuery } from './queries/get-tension-wire-survey.query';
import { CreateTensionWireSurveyCommand } from './commands/create-tension-wire-survey.command';
import { CreateTensionWireSurveyHandler } from './commands/create-tension-wire-survey.handler';
import { UpdateTensionWireSurveyCommand } from './commands/update-tension-wire-survey.command';
import { UpdateTensionWireSurveyHandler } from './commands/update-tension-wire-survey.handler';
import { MastSurveyResolver } from './mast-survey.resolver';
import { MastSurveyService } from './mast-survey.service';
import { MastSurveyRepository } from './mast-survey.repository';
import { GetMastSurveyHandler } from './queries/get-mast-survey.handler';
import { GetMastSurveyQuery } from './queries/get-mast-survey.query';
import { CreateMastSurveyCommand } from './commands/create-mast-survey.command';
import { CreateMastSurveyHandler } from './commands/create-mast-survey.handler';
import { UpdateMastSurveyCommand } from './commands/update-mast-survey.command';
import { UpdateMastSurveyHandler } from './commands/update-mast-survey.handler';
import { CreateFacadeSurveyCommand } from './commands/create-facade-survey.command';
import { CreateFacadeSurveyHandler } from './commands/create-facade-survey.handler';
import { UpdateFacadeSurveyCommand } from './commands/update-facade-survey.command';
import { UpdateFacadeSurveyHandler } from './commands/update-facade-survey.handler';
import { FacadeSurveyResolver } from './facade-survey.resolver';
import { FacadeSurveyService } from './facade-survey.service';
import { FacadeSurveyRepository } from './facade-survey.repository';
import { NodeSurveyResolver } from './node-survey.resolver';
import { NodeSurveyService } from './node-survey.service';
import { NodeSurveyRepository } from './node-survey.repository';
import { GetNodeSurveyQuery } from './queries/get-node-survey.query';
import { CreateNodeSurveyCommand } from './commands/create-node-survey.command';
import { CreateNodeSurveyHandler } from './commands/create-node-survey.handler';
import { UpdateNodeSurveyCommand } from './commands/update-node-survey.command';
import { UpdateNodeSurveyHandler } from './commands/update-node-survey.handler';

@Module({
	providers: [
		TensionWireSurveyResolver,
		MastSurveyResolver,
		FacadeSurveyResolver,
		NodeSurveyResolver,
		TensionWireSurveyService,
		MastSurveyService,
		FacadeSurveyService,
		NodeSurveyService,
		TensionWireSurveyRepository,
		MastSurveyRepository,
		FacadeSurveyRepository,
		NodeSurveyRepository,
		GetTensionWireSurveyHandler,
		GetMastSurveyHandler,
		GetTensionWireSurveyQuery,
		GetMastSurveyQuery,
		GetNodeSurveyQuery,
		CreateTensionWireSurveyCommand,
		CreateMastSurveyCommand,
		CreateTensionWireSurveyHandler,
		CreateMastSurveyHandler,
		CreateFacadeSurveyCommand,
		CreateFacadeSurveyHandler,
		CreateNodeSurveyCommand,
		CreateNodeSurveyHandler,
		UpdateTensionWireSurveyCommand,
		UpdateMastSurveyCommand,
		UpdateTensionWireSurveyHandler,
		UpdateMastSurveyHandler,
		UpdateFacadeSurveyCommand,
		UpdateFacadeSurveyHandler,
		UpdateNodeSurveyCommand,
		UpdateNodeSurveyHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class SpanInstallationSurveyModule {}
