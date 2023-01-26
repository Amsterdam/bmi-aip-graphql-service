import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';

import { ReachSegment } from '../../reach-segment/models/reach-segment.model';

@ObjectType({ description: 'arkSurvey' })
export class ArkSurvey {
	@Field((type) => ID)
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
	created_at: string;

	@Field((type) => String, { nullable: true })
	updated_at: string;

	@Field((type) => String, { nullable: true })
	deleted_at: string;

	@Field((type) => [ReachSegment], { nullable: 'itemsAndList' })
	reachSegments: ReachSegment[];
}
