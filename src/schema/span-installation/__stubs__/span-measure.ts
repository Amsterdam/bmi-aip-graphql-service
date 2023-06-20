import { SpanMeasure } from '../models/span-measure.model';
import { SpanMeasure as DomainSpanMeasure } from '../types/span-measure.repository.interface';
import { SpanMeasureFactory } from '../span-measure.factory';
import { CreateSpanMeasureInput } from '../dto/create-span-measure.input';
import { UpdateSpanMeasureInput } from '../dto/update-span-measure-input';
import { SpanDecompositionItemType } from '../types/span-decomposition-item-type';
import { SpanMeasureStatus } from '../types/span-measure-status';

export const spanMeasure1: SpanMeasure = {
	id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
	surveyId: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
	optionId: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
	decompositionItemId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
	decompositionItemType: 'SpanMeasure',
	description: '__NAME__',
	measureItems: [],
	status: SpanMeasureStatus.open,
	created_at: undefined,
	updated_at: undefined,
};

export const spanMeasureRaw: Omit<DomainSpanMeasure, 'id'> = {
	surveyId: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
	optionId: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
	decompositionItemId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
	decompositionItemType: SpanDecompositionItemType.spanSupportSystemMast,
	description: '__NAME__',
	created_at: null,
	updated_at: null,
};

export const domainSpanMeasure: DomainSpanMeasure = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...spanMeasureRaw,
};

export const createSpanMeasureInput = Object.keys(spanMeasureRaw).reduce((input, key) => {
	input[key] = spanMeasureRaw[key];
	return input;
}, new CreateSpanMeasureInput());

delete createSpanMeasureInput.createdAt;
delete createSpanMeasureInput.updatedAt;

const updateSpanMeasure = new UpdateSpanMeasureInput();
updateSpanMeasure.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateSpanMeasureInput = Object.keys(spanMeasureRaw).reduce((input, key) => {
	input[key] = spanMeasureRaw[key];
	return input;
}, updateSpanMeasure);

delete updateSpanMeasureInput.createdAt;
delete updateSpanMeasureInput.updatedAt;

export const spanMeasure = SpanMeasureFactory.CreateSpanMeasure(domainSpanMeasure);
