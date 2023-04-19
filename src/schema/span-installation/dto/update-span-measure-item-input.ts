import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseSpanMeasureInput } from './base-span-measure-input';

@InputType()
export class UpdateSpanMeasureItemInput extends BaseSpanMeasureInput {
	@Field()
	@IsUUID()
	public id: string;
}
