import { Field, Float, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType({ description: 'object' })
export class UpdateObjectModel {
	@Field((type) => String)
	success: string;
}
