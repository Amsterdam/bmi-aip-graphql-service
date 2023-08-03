import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'object' })
export class AdditionalPropsForOVSExportModel {
	@Field((type) => String)
	success: string;
}
