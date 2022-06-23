import { GisibFeature } from './GisibFeature';

export type GisibResponse<T> = {
	type: 'FeatureCollection';
	crs: {
		type: string;
		properties: {
			name: string;
		};
	};
	links: [
		{
			rel: string;
			type: string;
			title: string;
			href: string;
		},
	];
	features: GisibFeature<T>[];
};
