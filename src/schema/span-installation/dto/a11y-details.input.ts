import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class A11yDetailsInput {
	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public normallyAccessible?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public limitationOnTheMaximumPermittedAxleLoad?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public limitationOnTheMaximumHeadroom?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public limitationOnTheMaximumVehicleWidth?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public noChimneyPathAvailable?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public fencing?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public notAccessibleForAerialPlatform?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public keyNeeded?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public keySafe?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public requestAccess?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public trafficMeasuresNecessary?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public countersink?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public workOnPrivateLand?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public threeMeterDistanceToTramCatenary?: boolean;
}
