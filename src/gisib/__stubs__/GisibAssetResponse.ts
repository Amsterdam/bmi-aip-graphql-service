import { GisibAssetResponse } from '../types/GisibAssetResponse';

import { gisibAsset } from './GisibAsset';

export const gisibAssetResponse: GisibAssetResponse = {
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
		// {
		// 	rel: "prev",
		// 	type: "application/geo+json",
		// 	title: "Previous page",
		// 	href: "/api/OGCCollections/Civiele constructie/items?crs=28992&limit=20&offset=0"
		// },
		// {
		// 	rel: "first",
		// 	type: "application/geo+json",
		// 	title: "First page",
		// 	href: "/api/OGCCollections/Civiele constructie/items?crs=28992&limit=20&offset=0"
		// }
	],
	features: gisibAsset,
};
