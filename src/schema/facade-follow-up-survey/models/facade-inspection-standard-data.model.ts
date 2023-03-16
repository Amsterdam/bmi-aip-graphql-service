import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'inspectionStandardData' })
export class FacadeInspectionStandardData {
	@Field((type) => String, { nullable: true })
	remarks?: string;
}
