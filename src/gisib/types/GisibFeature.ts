export type GisibFeature<T> = {
	type: 'Feature';
	geometry: {
		type: string;
		crs: null;
		coordinates: Array<Array<any[]>>;
	};
	properties: T;
};
