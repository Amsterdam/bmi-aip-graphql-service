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

	async findBatchesForAssetThroughSurveys(objectId: string): Promise<DBBatch[]> {
		return this.prisma.batches.findMany({
			where: {
				surveys: {
					some: {
						objectId,
					},
				},
			},
		});
	}

	async getAllOVSBatches(): Promise<DBBatch[]> {
		// Wrote this awkward rawQuery as I could not figure out how to do this with the version of Prisma we use
		// Feel free to refactor this in the future

		return this.prisma.$queryRaw`
			SELECT b.*, inspectionTypesText
			FROM "batches" b
			cross join lateral json_array_elements_text ( "inspectionStandardTypes" ) as inspectionTypesText
			WHERE
				inspectionTypesText like '%spanInstallation%'
				AND status = 'active';
		`;
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
