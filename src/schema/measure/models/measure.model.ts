import { Field, ObjectType } from '@nestjs/graphql';

import { MeasureTypes, QuantityUnitOfMeasurement } from '../types/measure';
import { Survey } from '../../survey/models/survey.model';
import { Element } from '../../decomposition/models/element.model';
import { Unit } from '../../decomposition/models/unit.model';
import { Defect } from '../../ti/models/defect.model';
import { FailureMode } from '../../failure-mode/models/failure-mode.model';
import { Manifestation } from '../../decomposition/models/manifestation.model';

@ObjectType({ description: 'measure' })
export class Measure {
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

	@Field((type) => Manifestation, { nullable: true })
	manifestation?: Manifestation;

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

	@Field((type) => FailureMode, { nullable: true })
	failureMode?: FailureMode;

	@Field((type) => String, { nullable: true })
	defectId?: string;

	@Field((type) => Defect, { nullable: true })
	defect?: Defect;

	@Field((type) => String, { nullable: true })
	surveyScopeId?: string;

	@Field((type) => String, { nullable: true })
	deletedAt: string;
}
