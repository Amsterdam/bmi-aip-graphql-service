import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseCyclicMeasureInput } from './base-cyclic-measure.input';

@InputType()
export class UpdateCyclicMeasureInput extends BaseCyclicMeasureInput {
	@Field()
	@IsUUID()
	public id: string;
}
