import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';

import { ConditionService } from './condition.service';
import { ConditionResolver } from './condition.resolver';
import { CreateConditionHandler } from './commands/create-condition.handler';
import { ConditionRepository } from './condition.repository';
import { UpdateConditionHandler } from './commands/update-condition.handler';
import { FindConditionsQuery } from './queries/find-conditions.query';
import { FindConditionsHandler } from './queries/find-conditions.handler';

@Module({
	providers: [
		FindConditionsQuery,
		FindConditionsHandler,
		ConditionResolver,
		ConditionService,
		ConditionRepository,
		CreateConditionHandler,
		UpdateConditionHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class ConditionModule {}
