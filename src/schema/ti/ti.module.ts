import { registerEnumType } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';

import { RepairAdviceCategory } from './types';
import { DefectService } from './defect.service';
import { DefectRepository } from './defect.repository';
import { GetDefectQuery } from './queries/get-defect.query';
import { GetDefectHandler } from './queries/get-defect.handler';
import { ConditionResolver } from './condition.resolver';
import { ConditionService } from './condition.service';
import { ConditionRepository } from './condition.repository';
import { GetConditionQuery } from './queries/get-condition.query';
import { GetConditionHandler } from './queries/get-condition.handler';
import { CreateConditionHandler } from './commands/create-condition.handler';
import { UpdateConditionHandler } from './commands/update-condition.handler';

registerEnumType(RepairAdviceCategory, {
	name: 'RepairAdviceCategory',
});

@Module({
	providers: [
		DefectService,
		DefectRepository,
		GetDefectQuery,
		GetDefectHandler,
		GetConditionQuery,
		GetConditionHandler,
		ConditionResolver,
		ConditionService,
		ConditionRepository,
		CreateConditionHandler,
		UpdateConditionHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
	exports: [DefectService],
})
export class TiModule {}
