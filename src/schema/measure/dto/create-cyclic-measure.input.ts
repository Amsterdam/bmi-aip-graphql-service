import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseCyclicMeasureInput } from './base-cyclic-measure.input';

@InputType()
export class CreateCyclicMeasureInput extends BaseCyclicMeasureInput {
	// @Field()
	// public remarks: string;

	@Field()
	@IsUUID()
	public unitId: string;

	@Field()
	@IsUUID()
	public surveyId: string;
}
