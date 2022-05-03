import { Prisma } from '@prisma/client';

// NOTE: If at any point we'd benefit from more strict typing than what the prisma schema provides us with, we should
// be looking at creating a custom model that is constructed with a factory from the prisma query result
// rather than relying on leveraging the generated model types
const users = Prisma.validator<Prisma.usersArgs>()({
	select: {
		id: true,
		firstName: true,
		lastName: true,
		emailAddress: true,
		mobileNumber: true,
		officeNumber: true,
		companyId: true,
		isReadOnly: true,
		isAccountManager: true,
		isConfigurationManager: true,
		isContractManager: true,
	},
});
export type DBUser = Prisma.usersGetPayload<typeof users>;

export interface IUserRepository {
	getUserByEmail(email: string): Promise<DBUser>;
}
