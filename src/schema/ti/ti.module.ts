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

registerEnumType(RepairAdviceCategory, {
	name: 'RepairAdviceCategory',
});

@Module({
	providers: [DefectService, DefectRepository, GetDefectQuery, GetDefectHandler, PrismaService],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class TiModule {}
