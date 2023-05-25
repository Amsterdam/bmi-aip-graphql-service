import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { UpdateSupportSystemInput } from './update-support-system.input';

@InputType()
export class UpdateReviseSupportSystemInput extends UpdateSupportSystemInput {
	@IsOptional()
	@Field({ nullable: true })
	public remarksRevision?: string;
}
