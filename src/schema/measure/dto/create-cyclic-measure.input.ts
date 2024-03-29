import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

import { BaseCyclicMeasureInput } from './base-cyclic-measure.input';

@InputType()
export class CreateCyclicMeasureInput extends BaseCyclicMeasureInput {
	@Field()
	@IsUUID()
	public unitId: string;

	@Field()
	@IsUUID()
	public surveyId: string;

	@Field()
	@IsUUID()
	@IsOptional()
	public manifestationId?: string;

	@Field()
	@IsUUID()
	public defaultMaintenanceMeasureId: string;
}
