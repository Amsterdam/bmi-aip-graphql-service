import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { BaseCreateSurveyInput } from './base-survey.input';

@InputType()
export class CreateSurveyInput extends BaseCreateSurveyInput {
	@Field((type) => String)
	@IsUUID()
	public id: string;

	@Field((type) => String)
	@MaxLength(255)
	public objectId: string;

	@Field((type) => String)
	@MaxLength(255)
	public description: string;

	@Field((type) => String)
	status: string;

	@Field((type) => String)
	@MaxLength(255)
	public inspectionStandardType: string;
}
