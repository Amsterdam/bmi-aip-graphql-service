import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { UpdateSupportSystemNormalizedInput } from './update-support-system-normalized.input';

@InputType()
export class UpdateReviseSupportSystemNormalizedInput extends UpdateSupportSystemNormalizedInput {
	@IsOptional()
	@Field({ nullable: true })
	public remarksRevision?: string;
}
