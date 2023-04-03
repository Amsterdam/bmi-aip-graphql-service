import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, MaxLength } from 'class-validator';

import { ArkInspectionStandardDataInput } from './ark-inspection-standard-data.input';
import { BaseArkSurveyInput } from './base-ark-survey.input';
import { ReachSegmentInput } from './reach-segment.input';

@InputType()
export class UpdateArkSurveyInput extends BaseArkSurveyInput {
	@Field(() => [ReachSegmentInput], { nullable: true })
	public reachSegments?: ReachSegmentInput[];

	@IsOptional()
	@MaxLength(255)
	@Field((type) => String, { nullable: true })
	public preparedAuthor?: string;

	@IsOptional()
	@IsDate()
	@Field((type) => Date, { nullable: true })
	public preparedDate?: Date;

	@IsOptional()
	@MaxLength(255)
	@Field((type) => String, { nullable: true })
	public verifiedAuthor?: string;

	@IsOptional()
	@IsDate()
	@Field((type) => Date, { nullable: true })
	public verifiedDate?: Date;

	@IsOptional()
	@Field((type) => ArkInspectionStandardDataInput, { nullable: true })
	public inspectionStandardData?: ArkInspectionStandardDataInput;
}
