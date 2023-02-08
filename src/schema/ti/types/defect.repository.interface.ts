import { Prisma } from '@prisma/client';

const defects = Prisma.validator<Prisma.defectsArgs>()({
	select: {
		id: true,
		conditionId: true,
		name: true,
		code: true,
		description: true,
		seriousness: true,
		intensity: true,
		extend: true,
		repairAdviceCategory: true,
		repairDate: true,
		material: true,
		cause: true,
		aspect: true,
		repairAdvice: true,
		amount: true,
		amountTotal: true,
		measuringUnit: true,
		measuringUnitAbbreviation: true,
		score: true,
		defectType: true,
		locationDescription: true,
		details: true,
		riscLevel: true,
		ramsR: true,
		ramsA: true,
		ramsM: true,
		ramsS: true,
		careScore: true,
		ramsEc: true,
		ramsEnv: true,
		ramsTotalPriority: true,
		ramsWeightedPriority: true,
		created_at: true,
		updated_at: true,
	},
});

export type Defect = Prisma.defectsGetPayload<typeof defects>;

export interface IDefectRepository {
	getDefect(conditionId: string): Promise<Defect | null>;
}
