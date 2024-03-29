import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { UpdateLuminaireInput } from './update-luminaire.input';

@InputType()
export class ReviseLuminaireInput extends UpdateLuminaireInput {
	@IsOptional()
	@Field({ nullable: true })
	public remarksRevision?: string;
}
