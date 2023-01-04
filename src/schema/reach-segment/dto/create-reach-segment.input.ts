import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { BaseReachSegmentInput } from './base-reach-segment.input';

@InputType()
export class CreateReachSegmentInput extends BaseReachSegmentInput {
	@Field()
	@MaxLength(255)
	public name: string;

	@Field()
	@IsUUID()
	public surveyId: string;
}
