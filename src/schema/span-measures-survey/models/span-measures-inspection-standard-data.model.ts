import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'spanMeasuresInspcetionStandaradData' })
export class SpanMeasuresInspectionStandardData {
	@Field((type) => String, { nullable: true })
	generalRemarks?: string;
}
