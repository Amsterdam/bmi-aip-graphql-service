import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseCyclicMeasureInput } from '../dto/base-cyclic-measure.input';

@InputType()
export class GenerateCyclicMeasureInput extends BaseCyclicMeasureInput {
	@Field()
	@IsUUID()
	public surveyId: string;
}
