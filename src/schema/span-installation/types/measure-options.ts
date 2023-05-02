import { SpanMeasureOption } from '../models/span-measure-option.model';
import { SpanMeasureItemOption } from '../models/span-measure-item-option.model';

import { SpanDecompositionType } from './span-decomposition-type';
import { SpanMeasureItemType } from './span-measure-item-type';

export const spanMeasureItems: SpanMeasureItemOption[] = [
	{
		id: 'M345790',
		itemType: SpanMeasureItemType.material,
		description: 'M345790 Omschrijving van material',
	},
	{
		id: 'B345791',
		itemType: SpanMeasureItemType.specificationItem,
		description: '200010 Omschrijving van bestekpost ',
	},
	{
		id: 'M345792',
		itemType: SpanMeasureItemType.material,
		description: 'M345799 Omschrijving van materiaal',
	},
	{
		id: 'B345793',
		itemType: SpanMeasureItemType.specificationItem,
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
