import { Field, ObjectType } from '@nestjs/graphql';

import { CyclicMeasureTypes } from '../types/cyclic-measure';
import { QuantityUnitOfMeasurement } from '../../measure/types/measure';
import { Survey } from '../../survey/models/survey.model';
import { Unit } from '../../decomposition/models/unit.model';

@ObjectType({ description: 'cyclicMeasure' })
export class CyclicMeasure {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => Survey)
	survey: Survey;

	@Field((type) => String)
	unitId: string;

	@Field((type) => Unit)
	unit: Unit;

	@Field((type) => String)
	defaultMaintenanceMeasureId: string;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => Number, { nullable: true })
	planYear?: number;

	@Field((type) => Number, { nullable: true })
	finalPlanYear?: number;

	@Field((type) => Number, { nullable: true })
	costSurcharge?: number;

	@Field((type) => Number, { nullable: true })
	cycle?: number;

	@Field((type) => Number, { nullable: true })
	unitPrice?: number;

	@Field((type) => QuantityUnitOfMeasurement, { nullable: true })
	quantityUnitOfMeasurement?: string;

	@Field((type) => CyclicMeasureTypes, { nullable: true })
	maintenanceType?: string;

	@Field((type) => String, { nullable: true })
	deletedAt: string;
}
