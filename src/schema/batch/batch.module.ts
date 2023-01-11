import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { CompanyModule } from '../company/company.module';

import { BatchResolver } from './batch.resolver';
import { FindBatchExecutorCompaniesQuery } from './queries/find-batch-executor-companies.query';
import { FindBatchExecutorCompaniesHandler } from './queries/find-batch-executor-companies.handler';
import { BatchRepository } from './batch.repository';
import { BatchService } from './batch.service';

@Module({
	providers: [
		PrismaService,
		BatchResolver,
		FindBatchExecutorCompaniesQuery,
		FindBatchExecutorCompaniesHandler,
		BatchRepository,
		BatchService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, CompanyModule],
})
export class BatchModule {}
