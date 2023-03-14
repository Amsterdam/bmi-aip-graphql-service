import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FailureModeMetaDataInput {
	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public Faaloorzaak?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public BronVanFalen?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public GevolgVanFalen?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public FaaloorzaakAnders?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public BronVanFalenAnders?: string;
}
