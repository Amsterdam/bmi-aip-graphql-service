import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'inspcetionStandaradData' })
export class InspectionStandardData {
	@Field((type) => String, { nullable: true })
	generalRemarks?: string;
}
