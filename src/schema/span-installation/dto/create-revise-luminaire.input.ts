import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CreateLuminaireInput } from './create-luminaire.input';

@InputType()
export class CreateReviseLuminaireInput extends CreateLuminaireInput {
	@IsOptional()
	@Field({ nullable: true })
	public remarksRevision?: string;
}
