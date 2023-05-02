import { SpanMeasureOption } from '../models/span-measure-option.model';
import { SpanMeasureItemOption } from '../models/span-measure-item-option.model';

import { SpanDecompositionType } from './span-decomposition-type';
import { SpanMeasureItemType } from './span-measure-item-type';

export const spanMeasureItems: SpanMeasureItemOption[] = [
	{
		id: '60a224c8-57e7-4ade-88f9-65c3ec6b9233',
		itemType: SpanMeasureItemType.material,
		description: 'M345790 Omschrijving van material',
	},
	{
		id: 'dd55fe3a-edb0-4077-9f7a-d46e36383974',
		itemType: SpanMeasureItemType.specificationItem,
		description: '200010 Omschrijving van bestekpost ',
	},
	{
		id: '614f803b-0753-459f-b197-743cc30d9cf9',
		itemType: SpanMeasureItemType.material,
		description: 'M345799 Omschrijving van materiaal',
	},
	{
		id: 'a85af91a-1190-49bd-bd5e-043f7fd05b4f',
		itemType: SpanMeasureItemType.specificationItem,
		description: '200011 Omschrijving van bestekpost ',
	},
];

export const spanMeasureOptions: SpanMeasureOption[] = [
	{
		id: 'f6079d16-2794-44ed-86d6-3a20eee77621',
		description: 'Measure vervangen draagsystem',
		decompositionType: SpanDecompositionType.spanSupportSystemMast,
		measureItems: [...spanMeasureItems],
	},
];
