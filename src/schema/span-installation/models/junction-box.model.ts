import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';

@ObjectType({ description: 'junctionBox' })
export class JunctionBox {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	objectId: string;

	// 1 survey per contract; decomposition is scoped by survey/contract
	@Field((type) => String)
	surveyId: string;

	@Field((type) => String)
	name: string;

	// Maps to "Mastgetal"
	@Field((type) => Float, { nullable: true })
	mastNumber?: number;

	// Maps to "Straat"
	@Field((type) => String, { nullable: true })
	location?: string;

	// Maps to "Locatie aanduiding"
	@Field((type) => String, { nullable: true })
	locationIndication?: string;

	// Maps to "Bereikbaarheid gedetailleerd"
	@Field((type) => String, { nullable: true })
	a11yDetails?: string;

	// Maps to "Aanleghoogte"
	@Field((type) => Number, { nullable: true })
	installationHeight?: number;

	// Maps to "Stijgbuis zichtbaar"
	@Field((type) => Boolean, { nullable: true })
	riserTubeVisible?: boolean;

	// Maps to "Opmerking"
	@Field((type) => String, { nullable: true })
	remarks?: string;

	// Maps to "XY-coordinaat"
	// Stored in geography column
	// https://postgis.net/docs/using_postgis_dbmanagement.html#PostGIS_Geography
	@Field((type) => Point, { nullable: true })
	geography?: PointType;

	@Field((type) => String, { nullable: true })
	createdAt: string;

	@Field((type) => String, { nullable: true })
	updatedAt: string;

	@Field((type) => String, { nullable: true })
	deletedAt: string;
}
