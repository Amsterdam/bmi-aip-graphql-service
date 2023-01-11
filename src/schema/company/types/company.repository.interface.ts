import { Prisma } from '@prisma/client';

const companies = Prisma.validator<Prisma.companiesArgs>()({
	select: {
		id: true,
		role: true,
		name: true,
		street: true,
		state: true,
		city: true,
		zip: true,
		country: true,
		storageLimit: true,
		storageUsed: true,
		status: true,
		isClient: true,
		created_at: true,
		updated_at: true,
	},
});
export type DBCompany = Prisma.companiesGetPayload<typeof companies>;

export interface ICompanyRepository {
	getBatchExecutorCompanies(batchId: string): Promise<DBCompany[]>;
}
