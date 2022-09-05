import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'object' })
export class UndoOVSImportModel {
	@Field((type) => String)
	success: string;
}
