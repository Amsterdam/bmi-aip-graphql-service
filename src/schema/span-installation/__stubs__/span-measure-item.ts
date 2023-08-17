import { SpanMeasureItem as DomainSpanMeasureItem } from '../../span-installation/types/span-measure-item.repository.interface';
import { SpanMeasureItem } from '../models/span-measure-item.model';
import { CreateSpanMeasureItemInput } from '../dto/create-span-measure-item.input';
import { SaveSpanMeasureItemsInput } from '../dto/save-span-measure-items-input';

const spanMeasureItem = new SpanMeasureItem();
spanMeasureItem.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
spanMeasureItem.spanMeasureId = '1f728e79-1b89-4333-a309-ea93bf17667c';
spanMeasureItem.itemType = '1f728e79-1b89-4333-a309-ea93bf17667c';
spanMeasureItem.quantityUnitOfMeasurement = '1f728e79-1b89-4333-a309-ea93bf17667c';
spanMeasureItem.quantityEstimate = 1;
spanMeasureItem.quantityActual = 1;

export { spanMeasureItem };

export const spanMeasureItemRaw: Omit<SpanMeasureItem, 'id'> = {
	spanMeasureId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	optionId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	description: '__NAME__',
	itemType: 'material',
	quantityUnitOfMeasurement: '1f728e79-1b89-4333-a309-ea93bf17667c',
	quantityEstimate: 1,
	isActive: true,
};

export const domainSpanMeasureItem: DomainSpanMeasureItem = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	spanMeasureId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	optionId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	description: '__NAME__',
	itemType: 'material',
	quantityUnitOfMeasurement: '1f728e79-1b89-4333-a309-ea93bf17667c',
	quantityEstimate: 1,
	quantityActual: 2,
	isActive: true,
};

export const saveSpanMeasureItemRaw: SaveSpanMeasureItemsInput = {
	spanMeasureId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	spanMeasureItems: [
		{
			optionId: '1f728e79-1b89-4333-a309-ea93bf17667c',
			description: '__NAME__',
			itemType: 'material',
			quantityUnitOfMeasurement: '1f728e79-1b89-4333-a309-ea93bf17667c',
			quantityEstimate: 1,
		},
	],
};

export const saveSpanMeasureItemsInput = {
	spanMeasureId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	spanMeasureItems: [spanMeasureItemRaw],
};

export const createSpanMeasureItemInput = Object.keys(spanMeasureItemRaw).reduce((input, key) => {
	input[key] = spanMeasureItemRaw[key];
	return input;
}, new CreateSpanMeasureItemInput());

const saveSpanMeasureItem = new SaveSpanMeasureItemsInput();
saveSpanMeasureItem.spanMeasureId = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const saveSpanMeasureItemInput = Object.keys(saveSpanMeasureItemRaw).reduce((input, key) => {
	input[key] = saveSpanMeasureItemRaw[key];
	return input;
}, saveSpanMeasureItem);
