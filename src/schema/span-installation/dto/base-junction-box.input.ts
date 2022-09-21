import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Point as PointType } from 'geojson';
import { Point } from 'graphql-geojson-scalar-types';
import GraphQLJSON from 'graphql-type-json';

import type { CheckedA11yDetails } from '../types';

@InputType()
export class BaseJunctionBoxInput {
	@IsOptional()
	@IsNumber()
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
	@Field(() => GraphQLJSON, { nullable: true })
	public a11yDetails?: CheckedA11yDetails;

	@IsOptional()
	@IsNumber()
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
	@Field(() => Point, { nullable: true })
	geography?: PointType;

	@IsOptional()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsOptional()
	@Field({ nullable: true })
	updatedAt?: Date;

	@IsOptional()
	@Field({ nullable: true })
	deletedAt?: Date;
}
