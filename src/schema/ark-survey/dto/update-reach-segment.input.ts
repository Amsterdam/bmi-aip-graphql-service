import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseReachSegmentInput } from './base-reach-segment.input';

@InputType()
export class UpdateReachSegmentInput extends BaseReachSegmentInput {
	@Field()
	@IsUUID()
	public id: string;
}
