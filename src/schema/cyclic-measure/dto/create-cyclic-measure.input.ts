import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { BaseCyclicMeasureInput } from '../dto/base-cyclic-measure.input';

@InputType()
export class CreateCyclicMeasureInput extends BaseCyclicMeasureInput {
	@Field()
	@MaxLength(255)
	public remarks: string;

	@Field()
	@IsUUID()
	public unitId: string;
}
