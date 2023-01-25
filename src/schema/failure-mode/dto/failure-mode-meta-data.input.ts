import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FailureModeMetaDataInput {
	@IsOptional()
	@Field({ nullable: true })
	public faalOorzaak?: string;

	@IsOptional()
	@Field({ nullable: true })
	public bronVanValen?: string;

	@IsOptional()
	@Field({ nullable: true })
	public gevolgVanFalen?: string;

	@IsOptional()
	@Field({ nullable: true })
	public faaloorzaakAnders?: string;

	@IsOptional()
	@Field({ nullable: true })
	public bronVanFalenAnders?: string;
}
