import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { DBCompany } from '../company/types/company.repository.interface';

import { IBatchRepository } from './types/batch.repository.interface';

@Injectable()
export class BatchRepository implements IBatchRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getBatchExecutorCompanies(batchId: string): Promise<DBCompany[]> {
		const batch = await this.prisma.batches.findUnique({
			where: {
				id: batchId,
			},
			include: {
				batchExecutorCompanies: {
					include: {
						companies: true,
					},
				},
			},
		});

		return [...batch.batchExecutorCompanies.map((bec) => bec.companies)];
	}
}
