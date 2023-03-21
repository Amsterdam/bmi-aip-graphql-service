import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'inspectionStandardData' })
export class ArkInspectionStandardData {
	@Field((type) => String, { nullable: true })
	remarks?: string;
}
