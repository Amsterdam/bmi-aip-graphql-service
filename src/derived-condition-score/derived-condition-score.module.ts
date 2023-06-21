import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { PrismaService } from 'src/prisma.service';

import { DerivedConditionScoreService } from './derived-condition-score.service';
import { DerivedConditionScoreRepository } from './derived-condition-score.repository';

@Module({
	providers: [DerivedConditionScoreService, DerivedConditionScoreRepository, PrismaService],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
	exports: [DerivedConditionScoreService],
})
export class DerivedConditionScoreModule {}
