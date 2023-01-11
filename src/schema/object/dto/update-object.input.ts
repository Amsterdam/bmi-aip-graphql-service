import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

import { IPassport } from '../models/passport.model';

// TODO refactor this to be a sensible DTO for updating objects. Right now it is shaped towards only updating attributes
@InputType()
export class UpdateObjectInput {
	@Field()
	@MaxLength(255)
	public code: string;

	@Field(() => GraphQLJSON, { nullable: true })
	public attributes?: IPassport;
}
