import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CreateJunctionBoxInput } from './create-junction-box.input';

@InputType()
export class CreateReviseJunctionBoxInput extends CreateJunctionBoxInput {
	@IsOptional()
	@Field({ nullable: true })
	public remarksRevision?: string;
}
