import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { DBCompany, ICompanyRepository } from './types/company.repository.interface';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
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

		return batch?.batchExecutorCompanies.map((batchExecutorCompany) => batchExecutorCompany.companies) ?? [];
	}
}
