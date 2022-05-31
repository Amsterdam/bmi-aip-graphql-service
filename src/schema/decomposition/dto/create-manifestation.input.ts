import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { BaseManifestationInput } from './base-manifestation.input';

@InputType()
export class CreateManifestationInput extends BaseManifestationInput {
	@Field()
	@MaxLength(255)
	public name: string;

	@Field()
	@IsUUID()
	public objectId: string;

	@Field()
	@IsUUID()
	public surveyId: string;

	@Field()
	@IsUUID()
	public elementId: string;

	@Field()
	@IsUUID()
	public unitId: string;
}
