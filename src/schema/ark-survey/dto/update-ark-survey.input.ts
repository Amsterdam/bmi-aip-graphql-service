import { Field, InputType } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';

import { BaseArkSurveyInput } from './base-ark-survey.input';
import { ReachSegmentInput } from './reach-segment.input';

@InputType()
export class UpdateArkSurveyInput extends BaseArkSurveyInput {
	@Field(() => [ReachSegmentInput], { nullable: true })
	@ValidateNested({ each: true })
	public reachSegments?: ReachSegmentInput[];
}
