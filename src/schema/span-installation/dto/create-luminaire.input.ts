import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { BaseLuminaireInput } from './base-luminaire.input';

@InputType()
export class CreateLuminaireInput extends BaseLuminaireInput {
	@Field()
	@MaxLength(255)
	public name: string;

	@Field()
	@IsUUID()
	public supportSystemId: string;
}
