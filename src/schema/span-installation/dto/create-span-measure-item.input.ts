import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseSpanMeasureItemInput } from './base-span-measure-item-input';

@InputType()
export class CreateSpanMeasureItemInput extends BaseSpanMeasureItemInput {
	@Field()
	@IsUUID()
	public spanMeasureId: string;
}
