import { Field, InputType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';
import { IsUUID } from 'class-validator';

import { BaseArkSurveyGeographyDataInput } from './base-ark-survey-geography-data.input';

@InputType()
export class UpdateArkSurveyGeographyDataInput extends BaseArkSurveyGeographyDataInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field((type) => Point, { nullable: true })
	ArkGeographyStart?: PointType;

	@Field((type) => Point, { nullable: true })
	ArkGeographyRDStart?: PointType;

	@Field((type) => Point, { nullable: true })
	ArkGeographyEnd?: PointType;

	@Field((type) => Point, { nullable: true })
	ArkGeographyRDEnd?: PointType;
}
