// TODO rename to batch.resolver.ts

import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { Company } from '../company/models/company.model';

import { FindBatchExecutorCompaniesQuery } from './queries/find-batch-executor-companies.query';
import { Batch } from './models/batch.model';
import { DBBatch } from './types/batch.repository.interface';

@Resolver((of) => Batch)
export class BatchResolver {
	public constructor(private readonly prismaService: PrismaService, private queryBus: QueryBus) {}

	// TODO let service pass batches through the factory
	@Query((returns) => Batch, { name: 'getBatchById' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async getBatchById(@Args('id') id: string): Promise<DBBatch> {
		const batch = await this.prismaService.batches.findUnique({
			where: { id },
		});

		if (!batch) {
			throw new NotFoundException(`Unable to find batch with id: ${id}`);
		}

		return batch;
	}

	@ResolveField()
	executorCompanies(@Parent() { id }: Batch): Promise<Company[]> {
		return this.queryBus.execute<FindBatchExecutorCompaniesQuery>(new FindBatchExecutorCompaniesQuery(id));
	}
}
