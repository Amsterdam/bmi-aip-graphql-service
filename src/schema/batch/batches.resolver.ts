import { Args, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../../prisma.service';

import { Batch } from './models/batch.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Batch)
export class BatchesResolver {
	public constructor(private readonly prismaService: PrismaService) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@Query((returns) => Batch, { name: 'batches' })
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
