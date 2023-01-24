import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';

import { FailureModeService } from './failure-mode.service';
import { FailureModeResolver } from './failure-mode.resolver';
import { CreateFailureModeHandler } from './commands/create-failure-mode.handler';
import { FailureModeRepository } from './failure-mode.repository';
import { UpdateFailureModeHandler } from './commands/update-failure-mode.handler';
import { FindFailureModesQuery } from './queries/find-failure-modes.query';
import { FindFailureModesHandler } from './queries/find-failure-modes.handler';

@Module({
	providers: [
		FindFailureModesQuery,
		FindFailureModesHandler,
		FailureModeResolver,
		FailureModeService,
		FailureModeRepository,
		CreateFailureModeHandler,
		UpdateFailureModeHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class FailureModeModule {}
