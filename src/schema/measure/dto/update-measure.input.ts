import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseMeasureInput } from '../dto/base-measure.input';

@InputType()
export class UpdateMeasureInput extends BaseMeasureInput {
	@Field()
	@IsUUID()
	public id: string;
}
