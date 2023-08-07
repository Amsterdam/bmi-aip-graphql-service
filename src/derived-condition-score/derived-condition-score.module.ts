import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { AuthenticationModule } from '../authentication/authentication.module';

import { DerivedConditionScoreService } from './derived-condition-score.service';
import { DerivedConditionScoreRepository } from './derived-condition-score.repository';

@Module({
	providers: [DerivedConditionScoreService, DerivedConditionScoreRepository, PrismaService],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
	exports: [DerivedConditionScoreService],
})
export class DerivedConditionScoreModule {}
