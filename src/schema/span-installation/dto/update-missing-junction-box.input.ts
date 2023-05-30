import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { UpdateJunctionBoxInput } from './update-junction-box.input';

@InputType()
export class UpdateMissingJunctionBoxInput extends UpdateJunctionBoxInput {
	@IsOptional()
	@Field({ nullable: true })
	public remarksRevision?: string;
}
