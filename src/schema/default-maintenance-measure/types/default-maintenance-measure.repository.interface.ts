import { Prisma } from '@prisma/client';

const defaultMaintenanceMeasures = Prisma.validator<Prisma.defaultMaintenanceMeasuresArgs>()({
	select: {
		id: true,
		objectTypeUnitCodeId: true,
		material: true,
		description: true,
		cycle: true,
		maintenanceType: true,
		quantityUnitOfMeasurement: true,
		unitPrice: true,
		created_at: true,
		updated_at: true,
	},
});

export type DefaultMaintenanceMeasure = Prisma.defaultMaintenanceMeasuresGetPayload<typeof defaultMaintenanceMeasures>;

export interface IDefaultMaintenanceMeasureRepository {
	getDefaultMaintenanceMeasure(id: string): Promise<DefaultMaintenanceMeasure>;
}
