import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';

import { A11yDetails } from './a11y-details.model';

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
	@Field((type) => A11yDetails, { nullable: true })
	a11yDetails?: A11yDetails;
	// @Field((type) => GraphQLJSON, { nullable: true })
	// a11yDetails?: CheckedA11yDetails;

	// Maps to "Aanleghoogte"
	@Field((type) => Float, { nullable: true })
	installationHeight?: number;

	// Maps to "Stijgbuis zichtbaar"
	@Field((type) => Boolean, { nullable: true })
	riserTubeVisible?: boolean;

	// Maps to "Opmerking"
	@Field((type) => String, { nullable: true })
	remarks?: string;

	// Maps to "Opmerking Revisie"
	@Field((type) => String, { nullable: true })
	remarksRevision?: string;

	// Maps to "XY-coordinaat"
	// Stored in geography column
	// https://postgis.net/docs/using_postgis_dbmanagement.html#PostGIS_Geography
	@Field((type) => Point, { nullable: true })
	geography?: PointType;

	@Field((type) => Point, { nullable: true })
	geographyRD?: PointType;

	@Field((type) => String, { nullable: true })
	createdAt: string;

	@Field((type) => String, { nullable: true })
	updatedAt: string;

	@Field((type) => String, { nullable: true })
	deletedAt: string;

	// For contract 3 (spanMeasures) survey: This is a reference of the (contract 1) junctionBox id which this junctionBox is coloned from.
	// For contract 1 survey (spanInstallation), this is the same as the id of the junctionBox in contract 1.
	@Field((type) => String)
	permanentId: string;

	@Field((type) => Boolean, { nullable: true })
	hasDamage?: string;
}
