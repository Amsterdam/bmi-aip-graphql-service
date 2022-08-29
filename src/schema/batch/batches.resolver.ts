import { Args, Query, Resolver } from '@nestjs/graphql';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { PrismaService } from '../../prisma.service';
import { Batch } from '../../authorization/models/batch.model';

/*
	This resolver is just for illustrating
	that the prisma implementation is working, Maybe can removed in future
*/

@Resolver((of) => Batch)
export class BatchesResolver {
	public constructor(private readonly prismaService: PrismaService) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@Query((returns) => Batch, { name: 'batches' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async GetBatchById(@Args('id') id: string): Promise<Batch> {
		const batch = this.prismaService.batches.findUnique({
			where: { id: id },
		});
		if (!batch) {
			throw new Error('Method not implemented.');
		}

		return batch;
	}
}
