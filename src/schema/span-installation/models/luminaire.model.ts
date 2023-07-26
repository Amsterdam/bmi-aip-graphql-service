import { Field, ObjectType } from '@nestjs/graphql';
import { Point } from 'graphql-geojson-scalar-types';
import { Point as PointType } from 'geojson';

import { SupplierType } from '../types';

@ObjectType({ description: 'luminaire' })
export class Luminaire {
	@Field((type) => String)
	id: string;

	// Parent is scoped to supportSystemId, so on this level we don't need that verbosity
	@Field((type) => String)
	supportSystemId: string;

	@Field((type) => String)
	name: string;

	// Maps to "Straat"
	@Field((type) => String, { nullable: true })
	location?: string;

	@Field((type) => Boolean, { nullable: true })
	hasLED?: boolean;

	// Maps to "Jaar van aanleg"
	@Field((type) => Number, { nullable: true })
	constructionYear?: number;

	// Maps to "Leverancierstype"
	@Field((type) => String, { nullable: true })
	supplierType?: SupplierType;

	// Maps to "Fabrikant"
	@Field((type) => String, { nullable: true })
	manufacturer?: string;

	// Maps to "XY-coordinaat"
	// Stored in geography column
	// https://postgis.net/docs/using_postgis_dbmanagement.html#PostGIS_Geography
	@Field((type) => Point, { nullable: true })
	geography?: PointType;

	@Field((type) => Point, { nullable: true })
	geographyRD?: PointType;

	// Maps to "Opmerking"
	@Field((type) => String, { nullable: true })
	remarks?: string;

	// Maps to "Opmerking Revisie"
	@Field((type) => String, { nullable: true })
	remarksRevision?: string;

	// DRIVER

	// Maps to "Leverancierstype_driver"
	@Field((type) => String, { nullable: true })
	driverSupplierType?: SupplierType;

	// Maps to "Datum in gebruiksname"
	@Field((type) => String, { nullable: true })
	driverCommissioningDate?: string;

	// LIGHT SOURCE

	// Maps to "Leverancierstype_lamp"
	@Field((type) => String, { nullable: true })
	lightSupplierType?: SupplierType;

	// Maps to "Datum in gebruiksname"
	@Field((type) => String, { nullable: true })
	lightCommissioningDate?: string;

	@Field((type) => String, { nullable: true })
	createdAt: string;

	@Field((type) => String, { nullable: true })
	updatedAt: string;

	@Field((type) => String, { nullable: true })
	deletedAt: string;

	// For contract 3 (spanMeasures) survey: This is a reference of the (contract 1) luminaire id which this luminaire is coloned from.
	// For contract 1 survey (spanInstallation), this is the same as the id of the luminaire in contract 1.
	@Field((type) => String)
	permanentId: string;

	@Field((type) => Boolean, { nullable: true })
	hasDamage?: string;
}
