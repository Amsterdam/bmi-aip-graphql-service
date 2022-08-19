import { Field, ObjectType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';

import type { SupportSystemType, SupportSystemTypeDetailed } from '../../../types';

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
	@Field((type) => String)
	typeDetailed: SupportSystemTypeDetailed;

	// Maps to "Straat"
	@Field((type) => String, { nullable: true })
	location?: string;

	// Maps to "Jaar van aanleg"
	@Field((type) => Number, { nullable: true })
	constructionYear?: number;

	// Maps to "Bereikbaarheid gedetailleerd"
	@Field((type) => String, { nullable: true })
	a11yDetails?: string;

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

	// For type `gevel | mast | ring`
	// Maps to "Aanleghoogte"
	@Field((type) => Number, { nullable: true })
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