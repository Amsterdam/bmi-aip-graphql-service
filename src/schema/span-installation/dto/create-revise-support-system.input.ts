import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CreateSupportSystemInput } from './create-support-system.input';

@InputType()
export class CreateReviseSupportSystemInput extends CreateSupportSystemInput {
	@IsOptional()
	@Field({ nullable: true })
	public remarksRevision?: string;
}
