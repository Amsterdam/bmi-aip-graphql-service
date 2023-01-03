import { Prisma } from '@prisma/client';

import { CreateMeasureInput } from '../dto/create-measure.input';
import { UpdateMeasureInput } from '../dto/update-measure.input';

const measures = Prisma.validator<Prisma.measuresArgs>()({
	select: {
		id: true,
		surveyId: true,
		unitId: true,
		planYear: true,
		finalPlanYear: true,
		costSurcharge: true,
		unitPrice: true,
		quantityUnitOfMeasurement: true,
		maintenanceType: true,
		manifestationId: true,
		failureModeId: true,
		defectId: true,
		surveyScopeId: true,
		description: true,
		location: true,
		quantity: true,
		deleted_at: true,
	},
});
export type Measure = Prisma.measuresGetPayload<typeof measures>;

export interface IMeasureRepository {
	createMeasure(input: CreateMeasureInput): Promise<Measure>;
	updateMeasure(input: UpdateMeasureInput): Promise<Measure>;
	deleteMeasure(identifier: string): Promise<Measure>;
}
