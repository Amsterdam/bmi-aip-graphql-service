import { SpanMeasureItemType } from '../../schema/span-installation/types/span-measure-item-type';

export type MeasureItemOption = {
	id: string;
	description: string;
	itemType: SpanMeasureItemType;
};
