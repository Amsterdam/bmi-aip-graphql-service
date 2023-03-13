import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'inspectionStandardData' })
export class InspectionStandardData {
	@Field((type) => String, { nullable: true })
	remarks?: string;
}
