import { GisibResponse } from '../types/GisibResponse';
import { GisibElement } from '../types/GisibElement';

import { gisibElement1, gisibElement2 } from './gisibElement';

export const gisibElementResponse: GisibResponse<GisibElement> = {
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
			href: '/api/OGCCollections/Civiele constructie/items?crs=28992&limit=20&offset=20',
		},
	],
	features: [gisibElement1, gisibElement2],
};
