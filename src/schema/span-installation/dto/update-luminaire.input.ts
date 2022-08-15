import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID, MaxLength } from 'class-validator';

import { BaseLuminaireInput } from './base-luminaire.input';

@InputType()
export class UpdateLuminaireInput extends BaseLuminaireInput {
	@Field()
	@IsUUID()
	public id: string;

	@IsOptional()
	@Field()
	@MaxLength(255)
	public name?: string;
}
