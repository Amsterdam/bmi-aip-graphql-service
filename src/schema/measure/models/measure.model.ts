import { Field, ObjectType } from '@nestjs/graphql';

import { MeasureTypes, QuantityUnitOfMeasurement } from '../types/measure';

@ObjectType({ description: 'measure' })
export class Measure {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	unitId: string;

	@Field((type) => Number, { nullable: true })
	planYear?: number;

	@Field((type) => Number, { nullable: true })
	finalPlanYear?: number;

	@Field((type) => Number, { nullable: true })
	costSurcharge?: number;

	@Field((type) => String, { nullable: true })
	description?: string;

	@Field((type) => String, { nullable: true })
	location?: string;

	@Field((type) => Number, { nullable: true })
	quantity?: number;

	@Field((type) => Number, { nullable: true })
	unitPrice?: number;

	@Field((type) => QuantityUnitOfMeasurement, { nullable: true })
	quantityUnitOfMeasurement?: string;

	@Field((type) => MeasureTypes, { nullable: true })
	maintenanceType?: string;

	@Field((type) => String, { nullable: true })
	manifestationId?: string;

	@Field((type) => String, { nullable: true })
	failureModeId?: string;

	@Field((type) => String, { nullable: true })
	defectId?: string;

	@Field((type) => String, { nullable: true })
	surveyScopeId?: string;

	@Field((type) => String, { nullable: true })
	deletedAt: string;
}
