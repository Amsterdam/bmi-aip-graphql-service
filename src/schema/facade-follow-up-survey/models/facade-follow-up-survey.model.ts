import { Field, ObjectType } from '@nestjs/graphql';

// import GraphQLJSON from 'graphql-type-json';
import { InspectionStandardData } from './inspection-standard-data.model';

@ObjectType({ description: 'facadeFollowUpSurvey' })
export class FacadeFollowUpSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String, { nullable: true })
	preparedAuthor?: string;

	@Field((type) => Date, { nullable: true })
	preparedDate?: Date;

	@Field((type) => String, { nullable: true })
	verifiedAuthor?: string;

	@Field((type) => Date, { nullable: true })
	verifiedDate?: Date;

	@Field((type) => InspectionStandardData, { nullable: true })
	inspectionStandardData?: InspectionStandardData;
}
