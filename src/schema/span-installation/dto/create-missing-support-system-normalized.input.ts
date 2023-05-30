import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CreateSupportSystemNormalizedInput } from './create-support-system-normalized.input';

@InputType()
export class CreateMissingSupportSystemNormalizedInput extends CreateSupportSystemNormalizedInput {
	@IsOptional()
	@Field({ nullable: true })
	public remarksRevision?: string;
}
