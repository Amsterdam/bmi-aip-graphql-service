import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { BaseMeasureInput } from '../dto/base-measure.input';

@InputType()
export class CreateMeasureInput extends BaseMeasureInput {
	@Field()
	@MaxLength(255)
	public remarks: string;

	@Field()
	@IsUUID()
	public unitId: string;
}
