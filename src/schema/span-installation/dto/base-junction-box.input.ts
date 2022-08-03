import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDecimal, IsInt, IsJSON, IsOptional, MaxLength } from 'class-validator';
import { Point as PointType } from 'geojson';

@InputType()
export class BaseJunctionBoxInput {
	@IsOptional()
	@IsDecimal()
	@Field({ nullable: true })
	public mastNumber?: number;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public location?: string;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public locationIndication?: string;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public a11yDetails?: string;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public installationHeight?: number;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public riserTubeVisible?: boolean;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;

	@IsOptional()
	@IsJSON()
	@Field({ nullable: true })
	geography?: PointType;
}
