import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';

import type {
	SupportSystemType,
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedMast,
	SupportSystemTypeDetailedNode,
	SupportSystemTypeDetailedTensionWire,
} from '../types';

import { A11yDetails } from './a11y-details.model';
import { GeographyRD } from './geography-rd.model';

@ObjectType({ description: 'supportSystem' })
export class SupportSystem {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	objectId: string;

	// 1 survey per contract; decomposition is scoped by survey/contract
	@Field((type) => String)
	surveyId: string;

	@Field((type) => String)
	name: string;

	// Maps to "Type"
	@Field((type) => String)
	type: SupportSystemType;

	// Maps to "Bereikbaarheid gedetailleerd"
	@Field((type) => String, { nullable: true })
	typeDetailed:
		| SupportSystemTypeDetailedTensionWire
		| SupportSystemTypeDetailedMast
		| SupportSystemTypeDetailedFacade
		| SupportSystemTypeDetailedNode;

	// Maps to "Straat"
	@Field((type) => String, { nullable: true })
	location?: string;

	// Maps to "Jaar van aanleg"
	@Field((type) => Number, { nullable: true })
	constructionYear?: number;

	// Maps to "Bereikbaarheid gedetailleerd"
	@Field((type) => A11yDetails, { nullable: true })
	a11yDetails?: A11yDetails;

	// Maps to "Opmerking"
	@Field((type) => String, { nullable: true })
	remarks?: string;

	// Maps to "Locatie aanduiding"
	@Field((type) => String, { nullable: true })
	locationIndication?: string;

	// For type `gevel | mast | ring`
	// Maps to "XY-coordinaat"
	// Stored in geography column
	// https://postgis.net/docs/using_postgis_dbmanagement.html#PostGIS_Geography
	@Field((type) => Point, { nullable: true })
	geography?: PointType;

	@Field((type) => GeographyRD, { nullable: true })
	geographyRD?: GeographyRD;

	// For type `gevel | mast | ring`
	// Maps to "Aanleghoogte"
	@Field((type) => Float, { nullable: true })
	installationHeight?: number;

	// For type `gevel`
	// Maps to "Huisnummer + verdieping"
	@Field((type) => String, { nullable: true })
	houseNumber?: string;

	@Field((type) => String, { nullable: true })
	createdAt: string;

	@Field((type) => String, { nullable: true })
	updatedAt: string;

	@Field((type) => String, { nullable: true })
	deletedAt: string;
}
