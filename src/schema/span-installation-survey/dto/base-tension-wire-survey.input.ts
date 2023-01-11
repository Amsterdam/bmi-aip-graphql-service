import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class BaseTensionWireSurveyInput {
	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public tensionWireDamage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public thirdPartyObjectsAttached?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public gaffTerminalDamage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public gaffTerminalMissingParts?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public faultyMontage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public tensionWireClampDamage?: boolean;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;
}
