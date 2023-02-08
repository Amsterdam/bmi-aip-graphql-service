import { Prisma } from '@prisma/client';

import { CreateCyclicMeasureInput } from '../dto/create-cyclic-measure.input';
import { UpdateCyclicMeasureInput } from '../dto/update-cyclic-measure.input';

const cyclicMeasures = Prisma.validator<Prisma.cyclicMeasuresArgs>()({
	select: {
		id: true,
		surveyId: true,
		unitId: true,
		planYear: true,
		finalPlanYear: true,
		costSurcharge: true,
		remarks: true,
		cycle: true,
		unitPrice: true,
		quantityUnitOfMeasurement: true,
		defaultMaintenanceMeasureId: true,
		deleted_at: true,
		maintenanceType: true,
		failureModeId: true,
		defectId: true,
	},
});
export type CyclicMeasure = Prisma.cyclicMeasuresGetPayload<typeof cyclicMeasures>;

export interface ICyclicMeasureRepository {
	createCyclicMeasure(input: CreateCyclicMeasureInput): Promise<CyclicMeasure>;
	updateCyclicMeasure(input: UpdateCyclicMeasureInput): Promise<CyclicMeasure>;
	deleteCyclicMeasure(identifier: string): Promise<CyclicMeasure>;
}
