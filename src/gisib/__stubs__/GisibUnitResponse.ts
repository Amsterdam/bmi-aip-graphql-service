import { GisibUnitResponse } from '../types/GisibUnitResponse';

import { gisibUnit } from './GisibUnit';

export const gisibUnitResponse: GisibUnitResponse = {
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
		// {
		// 	rel: "prev",
		// 	type: "application/geo+json",
		// 	title: "Previous page",
		// 	href: "/api/OGCCollections/NEN Bouwdeel/items?crs=28992&limit=20&offset=0"
		// },
		// {
		// 	rel: "first",
		// 	type: "application/geo+json",
		// 	title: "First page",
		// 	href: "/api/OGCCollections/NEN Bouwdeel/items?crs=28992&limit=20&offset=0"
		// }
	],
	features: gisibUnit,
};
