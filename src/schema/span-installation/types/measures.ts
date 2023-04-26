import { SpanMeasureOption } from '../models/span-measure-option.model';
import { SpanMeasureItemOption } from '../models/span-measure-item-option.model';

export const spanMeasureItems: SpanMeasureItemOption[] = [
	{
		id: 'M345790',
		entityListId: '',
		itemType: 'material',
		description: 'M345790 Omschrijving van material',
	},
	{
		id: 'sd',
		entityListId: '',
		itemType: 'bestekpost',
		description: '200010 Omschrijving van bestekpost ',
	},
	{
		id: 'sda',
		entityListId: '',
		itemType: 'materiaal',
		description: 'M345799 Omschrijving van materiaal',
	},
	{
		id: 'sad',
		entityListId: '',
		itemType: 'bestekpost',
		description: '200011 Omschrijving van bestekpost ',
	},
];

export const spanMeasureOptions: SpanMeasureOption[] = [
	{
		id: '',
		entityListId: '',
		description: 'Measure vervavngen draagsystem',
		measureItems: [...spanMeasureItems],
	},
];
