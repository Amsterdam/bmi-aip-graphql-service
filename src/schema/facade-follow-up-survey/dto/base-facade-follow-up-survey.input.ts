import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, MaxLength, IsUUID } from 'class-validator';

import { InspectionStandardDataInput } from './inspection-standard-data.input';

@InputType()
export class BaseFacadeFollowUpSurveyInput {
	@Field((type) => String)
	@IsUUID()
	public surveyId: string;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public preparedAuthor?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	public preparedDate?: Date;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public verifiedAuthor?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	public verifiedDate?: Date;

	@IsOptional()
	@Field((type) => InspectionStandardDataInput, { nullable: true })
	public inspectionStandardData?: InspectionStandardDataInput;
}
