type Measure = {
	id: string;
	name: string;
	spanMeasureItems: SpanMeasureItem[];
};

// export type Material = {
// 	id: string;
// 	type: string;
// 	description: string;
// };

export type SpanMeasureItem = {
	id: string;
	type: string;
	description: string;
};

export const spanMeasureItems: SpanMeasureItem[] = [
	{
		id: 'M345790',
		type: 'material',
		description: 'M345790 Omschrijving van material',
	},
	{
		id: '',
		type: 'bestekpost',
		description: '200010 Omschrijving van bestekpost ',
	},
	{
		id: '',
		type: 'materiaal',
		description: 'M345799 Omschrijving van materiaal',
	},
	{
		id: '',
		type: 'bestekpost',
		description: '200011 Omschrijving van bestekpost ',
	},
];

export const spanMeasures: Measure[] = [
	{
		id: '',
		name: 'Measure vervavngen draagsystem',
		spanMeasureItems: [...spanMeasureItems],
	},
];
