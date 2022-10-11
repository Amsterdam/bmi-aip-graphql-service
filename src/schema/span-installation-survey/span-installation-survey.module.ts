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
import { JunctionBoxSurveyResolver } from './junction-box-survey.resolver';
import { JunctionBoxSurveyService } from './junction-box-survey.service';
import { JunctionBoxSurveyRepository } from './junction-box-survey.repository';
import { GetJunctionBoxSurveyQuery } from './queries/get-junction-box-survey.query';
import { GetNodeSurveyHandler } from './queries/get-node-survey.handler';
import { GetJunctionBoxSurveyHandler } from './queries/get-junction-box-survey.handler';
import { GetFacadeSurveyHandler } from './queries/get-facade-survey.handler';
import { GetFacadeSurveyQuery } from './queries/get-facade-survey.query';
import { CreateJunctionBoxSurveyCommand } from './commands/create-junction-box-survey.command';
import { CreateJunctionBoxSurveyHandler } from './commands/create-junction-box-survey.handler';
import { UpdateJunctionBoxSurveyCommand } from './commands/update-junction-box-survey.command';
import { UpdateJunctionBoxSurveyHandler } from './commands/update-junction-box-survey.handler';

@Module({
	providers: [
		TensionWireSurveyResolver,
		MastSurveyResolver,
		FacadeSurveyResolver,
		NodeSurveyResolver,
		JunctionBoxSurveyResolver,

		TensionWireSurveyService,
		MastSurveyService,
		FacadeSurveyService,
		NodeSurveyService,
		JunctionBoxSurveyService,

		TensionWireSurveyRepository,
		MastSurveyRepository,
		FacadeSurveyRepository,
		NodeSurveyRepository,
		JunctionBoxSurveyRepository,

		GetTensionWireSurveyQuery,
		GetTensionWireSurveyHandler,
		GetMastSurveyQuery,
		GetMastSurveyHandler,
		GetFacadeSurveyQuery,
		GetFacadeSurveyHandler,
		GetNodeSurveyQuery,
		GetNodeSurveyHandler,
		GetJunctionBoxSurveyQuery,
		GetJunctionBoxSurveyHandler,

		CreateTensionWireSurveyCommand,
		CreateTensionWireSurveyHandler,
		CreateMastSurveyCommand,
		CreateMastSurveyHandler,
		CreateFacadeSurveyCommand,
		CreateFacadeSurveyHandler,
		CreateNodeSurveyCommand,
		CreateNodeSurveyHandler,
		CreateJunctionBoxSurveyCommand,
		CreateJunctionBoxSurveyHandler,

		UpdateTensionWireSurveyCommand,
		UpdateMastSurveyCommand,
		UpdateTensionWireSurveyHandler,
		UpdateMastSurveyHandler,
		UpdateFacadeSurveyCommand,
		UpdateFacadeSurveyHandler,
		UpdateNodeSurveyCommand,
		UpdateNodeSurveyHandler,
		UpdateJunctionBoxSurveyCommand,
		UpdateJunctionBoxSurveyHandler,

		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class SpanInstallationSurveyModule {}
