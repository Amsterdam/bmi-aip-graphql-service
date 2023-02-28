import { Prisma } from '@prisma/client';

const objectTypeUnitCodes = Prisma.validator<Prisma.objectTypeUnitCodesArgs>()({
	select: {
		id: true,
		code: true,
		name: true,
		replacementIndex: true,
		isStructural: true,
		isElectrical: true,
		created_at: true,
		updated_at: true,
	},
});
export type ObjectTypeUnitCode = Prisma.objectTypeUnitCodesGetPayload<typeof objectTypeUnitCodes>;

export interface IObjectTypeUnitCodeRepository {
	findByCode(code: string): Promise<ObjectTypeUnitCode>;
}
