import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID, MaxLength } from 'class-validator';

import { BaseManifestationInput } from './base-manifestation.input';

@InputType()
export class UpdateManifestationInput extends BaseManifestationInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field()
	@MaxLength(255)
	@IsOptional()
	public name?: string;
}
