import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';

@ObjectType({ description: 'arkSurvey' })
export class ArkSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => Point, { nullable: true })
	ArkGeographyStart?: PointType;

	@Field((type) => Point, { nullable: true })
	ArkGeographyRDStart?: PointType;

	@Field((type) => Point, { nullable: true })
	ArkGeographyEnd?: PointType;

	@Field((type) => Point, { nullable: true })
	ArkGeographyRDEnd?: PointType;

	@Field((type) => String, { nullable: true })
	created_at: string;

	@Field((type) => String, { nullable: true })
	updated_at: string;

	@Field((type) => String, { nullable: true })
	deleted_at: string;
}
