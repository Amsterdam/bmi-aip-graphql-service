import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'spanMeasuresInspectionStandardData' })
export class SpanMeasuresInspectionStandardData {
	@Field((type) => String, { nullable: true })
	generalRemarks?: string;

	@Field((type) => String, { nullable: true })
	completionRemarks?: string;
}
