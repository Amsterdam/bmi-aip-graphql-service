import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

import { IPassport } from '../models/passport.model';

@InputType()
export class AssetAttributesInput {
	@Field()
	@MaxLength(255)
	assetId?: string;

	@Field(() => GraphQLJSON, { nullable: true })
	attributes?: IPassport;
}
