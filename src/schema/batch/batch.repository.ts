import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { DBCompany } from '../company/types/company.repository.interface';

import { DBBatch, IBatchRepository } from './types/batch.repository.interface';

@Injectable()
export class BatchRepository implements IBatchRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getBatchDetails(batchId: string): Promise<DBBatch> {
		const batch = await this.prisma.batches.findUnique({
			where: {
				id: batchId,
			},
		});

		return batch;
	}

	async getAllOVSBatches(): Promise<DBBatch[]> {
		// TODO: Add filter for specifically OVS batches

		const batches = await this.prisma.batches.findMany({
			where: {
				status: 'active',
			},
		});

		return batches;
	}

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
