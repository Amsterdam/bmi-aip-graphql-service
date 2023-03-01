import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

import { BaseMeasureInput } from '../dto/base-measure.input';

@InputType()
export class CreateMeasureInput extends BaseMeasureInput {
	@Field()
	@IsUUID()
	public unitId: string;

	@Field()
	@IsUUID()
	public surveyId: string;

	@Field({ nullable: true })
	@IsUUID()
	@IsOptional()
	public manifestationId?: string;
}
