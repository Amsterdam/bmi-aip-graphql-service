import { GisibUnit } from './GisibUnit';

export type GisibUnitResponse = {
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
	features: GisibUnit[];
};
