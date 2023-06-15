import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';
import { ApiProperty } from '@nestjs/swagger';

import { ReachSegment } from './reach-segment.model';
import { ArkInspectionStandardData } from './ark-inspection-standard-data.model';

@ObjectType({ description: 'arkSurvey' })
export class ArkSurvey {
	@Field((type) => String)
	@ApiProperty({ description: 'The identifier of this survey in AIP' })
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => Point, { nullable: true })
	@ApiProperty({ description: 'The starting point coördinate (in WGS format)', type: Object })
	arkGeographyStart?: PointType;

	@Field((type) => Point, { nullable: true })
	@ApiProperty({ description: 'The starting point coördinate (in Rijksdriehoeks format)', type: Object })
	arkGeographyRDStart?: PointType;

	@Field((type) => Point, { nullable: true })
	@ApiProperty({ description: 'The ending point coördinate (in WGS format)', type: Object })
	arkGeographyEnd?: PointType;

	@Field((type) => Point, { nullable: true })
	@ApiProperty({ description: 'The ending point coördinate (in Rijksdriehoeks format)', type: Object })
	arkGeographyRDEnd?: PointType;

	@Field((type) => String, { nullable: true })
	@ApiProperty({ description: 'The date the inspection has been created' })
	created_at: string;

	@Field((type) => String, { nullable: true })
	@ApiProperty({ description: 'The date the inspection has last been updated' })
	updated_at: string;

	@Field((type) => String, { nullable: true })
	deleted_at: string;

	@Field((type) => [ReachSegment], { nullable: 'itemsAndList' })
	@ApiProperty({ description: 'An array of ReachSegments objects (rakdelen)', type: [ReachSegment] })
	reachSegments: ReachSegment[];

	@Field((type) => String, { nullable: true })
	preparedAuthor: string;

	@Field((type) => Date, { nullable: true })
	preparedDate: Date;

	@Field((type) => String, { nullable: true })
	verifiedAuthor: string;

	@Field((type) => Date, { nullable: true })
	verifiedDate: Date;

	@Field((type) => ArkInspectionStandardData, { nullable: true })
	inspectionStandardData?: ArkInspectionStandardData;
}
