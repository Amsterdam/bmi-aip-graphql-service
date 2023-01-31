import { Field, InputType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';
import { IsGeometry } from 'src/IsGeometry';

@InputType()
export class BaseArkSurveyInput {
	@Field((type) => String)
	surveyId: string;

	@Field((type) => Point, { nullable: true })
	@IsGeometry('wgs')
	arkGeographyStart?: PointType;

	@Field((type) => Point, { nullable: true })
	@IsGeometry('rds')
	arkGeographyRDStart?: PointType;

	@Field((type) => Point, { nullable: true })
	@IsGeometry('wgs')
	arkGeographyEnd?: PointType;

	@Field((type) => Point, { nullable: true })
	@IsGeometry('rds')
	arkGeographyRDEnd?: PointType;
}
