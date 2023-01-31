import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ValidateNested } from 'class-validator';

import { BaseArkSurveyInput } from './base-ark-survey.input';
import { ReachSegmentInput } from './reach-segment.input';

@InputType()
export class UpdateArkSurveyInput extends BaseArkSurveyInput {
	@Field(() => [ReachSegmentInput], { nullable: true })
	@ValidateNested({ each: true })
	@Type(() => ReachSegmentInput)
	@ArrayMaxSize(26)
	public reachSegments?: ReachSegmentInput[];
}
