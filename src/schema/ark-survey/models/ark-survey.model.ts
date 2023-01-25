import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';

import { ReachSegment } from './reach-segment.model';

@ObjectType({ description: 'arkSurvey' })
export class ArkSurvey {
	@Field((type) => String)
	id: string;

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

	@Field((type) => String, { nullable: true })
	createdAt: string;

	@Field((type) => String, { nullable: true })
	updatedAt: string;

	@Field((type) => String, { nullable: true })
	deletedAt: string;

	@Field((type) => [ReachSegment], { nullable: 'itemsAndList' })
	reachSegments: ReachSegment[];
}
