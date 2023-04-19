import { SpanMeasure } from '../models/span-measure.model';
import { SpanMeasure as DomainSpanMeasure } from '../types/span-measure.repository.interface';
import { SpanMeasureFactory } from '../span-measure.factory';
import { CreateSpanMeasureInput } from '../dto/create-span-measure.input';
import { UpdateSpanMeasureInput } from '../dto/update-span-measure-input';

const spanMeasure1 = new SpanMeasure();
spanMeasure1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
spanMeasure1.decompositionId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
spanMeasure1.decompositionType = 'SpanMeasure';
spanMeasure1.name = 'Aanpakken losse kabels';

export { spanMeasure1 };

export const spanMeasureRaw: Omit<SpanMeasure, 'id'> = {
	surveyId: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
	decompositionId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
	decompositionType: 'SpanMeasure',
	name: 'Aanpakken losse kabels',
	measureItems: [],
	createdAt: '',
	updatedAt: '',
};

export const domainSpanMeasure: DomainSpanMeasure = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...spanMeasureRaw,
	created_at: new Date(spanMeasureRaw.createdAt),
	updated_at: new Date(spanMeasureRaw.updatedAt),
};

export const createSpanMeasureInput = Object.keys(spanMeasureRaw).reduce((input, key) => {
	input[key] = spanMeasureRaw[key];
	return input;
}, new CreateSpanMeasureInput());

const updateSpanMeasure = new UpdateSpanMeasureInput();
updateSpanMeasure.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateSpanMeasureInput = Object.keys(spanMeasureRaw).reduce((input, key) => {
	input[key] = spanMeasureRaw[key];
	return input;
}, updateSpanMeasure);

export const spanMeasure = SpanMeasureFactory.CreateSpanMeasure(domainSpanMeasure);
