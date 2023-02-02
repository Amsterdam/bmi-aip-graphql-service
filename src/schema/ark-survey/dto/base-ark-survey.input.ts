import { Field, InputType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';

@InputType()
export class BaseArkSurveyInput {
	@Field((type) => String)
	surveyId: string;

	@Field((type) => Point, { nullable: true })
	arkGeographyStart?: PointType;

	@Field((type) => Point, { nullable: true })
	arkGeographyRDStart?: PointType;

	@Field((type) => Point, { nullable: true })
	arkGeographyEnd?: PointType;

	@Field((type) => Point, { nullable: true })
	arkGeographyRDEnd?: PointType;
}
