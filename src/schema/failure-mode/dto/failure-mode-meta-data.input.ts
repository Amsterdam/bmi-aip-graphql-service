import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FailureModeMetaDataInput {
	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public faalOorzaak?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public bronVanValen?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public gevolgVanFalen?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public faaloorzaakAnders?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public bronVanFalenAnders?: string;
}
