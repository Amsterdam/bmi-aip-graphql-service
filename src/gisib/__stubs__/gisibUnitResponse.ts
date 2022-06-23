import { GisibResponse } from '../types/GisibResponse';
import { GisibUnit } from '../types/GisibUnit';

import { gisibUnit1, gisibUnit2 } from './gisibUnit';

export const gisibUnitResponse: GisibResponse<GisibUnit> = {
	type: 'FeatureCollection',
	crs: {
		type: 'name',
		properties: {
			name: 'urn:ogc:def:crs:EPSG::28992',
		},
	},
	links: [
		{
			rel: 'next',
			type: 'application/geo+json',
			title: 'Next page',
			href: '/api/OGCCollections/NEN Bouwdeel/items?crs=28992&limit=20&offset=20',
		},
	],
	features: [gisibUnit1, gisibUnit2],
};
