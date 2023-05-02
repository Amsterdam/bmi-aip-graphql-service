import { SpanMeasureOption } from '../models/span-measure-option.model';
import { SpanMeasureItemOption } from '../models/span-measure-item-option.model';

import { SpanDecompositionType } from './span-decomposition-type';

export const spanMeasureItems: SpanMeasureItemOption[] = [
	{
		id: 'M345790',
		itemType: 'material',
		description: 'M345790 Omschrijving van material',
	},
	{
		id: 'sd',
		itemType: 'bestekpost',
		description: '200010 Omschrijving van bestekpost ',
	},
	{
		id: 'sda',
		itemType: 'materiaal',
		description: 'M345799 Omschrijving van materiaal',
	},
	{
		id: 'sad',
		itemType: 'bestekpost',
		description: '200011 Omschrijving van bestekpost ',
	},
];

export const spanMeasureOptions: SpanMeasureOption[] = [
	{
		id: 'ABC123',
		description: 'Measure vervangen draagsystem',
		decompositionType: SpanDecompositionType.spanSupportSystemMast,
		measureItems: [...spanMeasureItems],
	},
];
