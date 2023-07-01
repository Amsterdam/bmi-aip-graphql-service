import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, MaxLength } from 'class-validator';

import { BaseSpanMeasuresSurveyInput } from './base-span-measures-survey-input';

@InputType()
export class UpdateSpanMeasuresSurveyInput extends BaseSpanMeasuresSurveyInput {
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
}
