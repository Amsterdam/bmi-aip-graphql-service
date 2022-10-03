import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

import { BaseAssetInput } from './base-asset.input';

// TODO refactor this to be a sensible DTO for updating objects. Right now it is shaped towards only updating attributes
@InputType()
export class UpdateAssetInput extends BaseAssetInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field()
	@MaxLength(255)
	public code: string;

	@Field(() => GraphQLJSON, { nullable: true })
	public attributes?: string;
}
