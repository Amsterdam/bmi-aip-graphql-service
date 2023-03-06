import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, MaxLength, IsUUID } from 'class-validator';

@InputType()
export class BaseFacadeFollowUpSurveyInput {
	@Field((type) => String)
	@IsUUID()
	surveyId: string;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	preparedAuthor?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	preparedDate?: Date;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	verifiedAuthor?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	verifiedDate?: Date;

	@IsOptional()
	@Field({ nullable: true })
	remarks?: string;
}
