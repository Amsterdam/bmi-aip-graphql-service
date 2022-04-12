import { Args, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../../prisma.service';

import { BatchModel } from './models/batch.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => BatchModel)
export class BatchesResolver {
	public constructor(private readonly prismaService: PrismaService) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@Query((returns) => BatchModel, { name: 'batches' })
	public async GetBatchById(@Args('id') id: string): Promise<BatchModel> {
		const batch = this.prismaService.batch.findOne({
			where: { id: id },
		});
		if (!batch) {
			throw new Error('Method not implemented.');
		}

		return batch;
	}
}
