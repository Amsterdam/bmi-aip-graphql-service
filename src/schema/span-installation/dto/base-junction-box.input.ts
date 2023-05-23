import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Point as PointType } from 'geojson';
import { Point } from 'graphql-geojson-scalar-types';

import { A11yDetailsInput } from './a11y-details.input';
import { SpanDecompositionDataInput } from './span-decomposition-data.input';

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
	@Field(() => A11yDetailsInput, { nullable: true })
	public a11yDetails?: A11yDetailsInput;

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
	@Field(() => Point, { nullable: true })
	geographyRD?: PointType;

	@IsOptional()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsOptional()
	@Field({ nullable: true })
	updatedAt?: Date;

	@IsOptional()
	@Field({ nullable: true })
	deletedAt?: Date;

	@IsOptional()
	@Field((type) => SpanDecompositionDataInput, { nullable: true })
	public spanDecompositionData?: SpanDecompositionDataInput;
}
