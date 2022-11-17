import { Prisma } from '@prisma/client';

import { DBCompany } from '../../company/types/company.repository.interface';

const batches = Prisma.validator<Prisma.batchesArgs>()({
	select: {
		id: true,
		name: true,
		status: true,
		startDate: true,
		endDate: true,
		plannedStartDate: true,
		plannedEndDate: true,
		contractId: true,
		tranchId: true,
		remarks: true,
		legacyFailureMode: true,
		created_at: true,
		updated_at: true,
	},
});
export type DBBatch = Prisma.batchesGetPayload<typeof batches>;

export interface IBatchRepository {
	getBatchExecutorCompanies(batchId: string): Promise<DBCompany[]>;
}
