import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class BaseJunctionBoxSurveyInput {
	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public cableDamage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public faultyMontageTensionWire?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public faultyMontageFacade?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public junctionBoxDamage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public stickerNotReadable?: boolean;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;
}
