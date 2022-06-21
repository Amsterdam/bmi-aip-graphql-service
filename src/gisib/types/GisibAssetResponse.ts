import { GisibAsset } from './GisibAsset';

export type GisibAssetResponse = {
	type: string;
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
	features: GisibAsset[];
};
