import { UpdateSpanMeasuresSurveyInput } from '../dto/update-span-measures-survey.input';
import { SpanMeasuresSurveyFactory } from '../span-measures-survey.factory';
import { SpanMeasuresSurvey as DomainSpanMeasuresSurvey } from '../types/span-measures-survey.repository.interface';

export const spanMeasuresSurveyRaw: Omit<DomainSpanMeasuresSurvey, 'id'> = {
	inspectionStandardData: { generalRemarks: '__TEST__', completionRemarks: '__TEST__' },
};

const updateSpanMeasuresSurveyInputRaw = new UpdateSpanMeasuresSurveyInput();

export const updateSpanMeasuresSurveyInput = Object.keys(spanMeasuresSurveyRaw).reduce((input, key) => {
	input[key] = spanMeasuresSurveyRaw[key];
	return input;
}, updateSpanMeasuresSurveyInputRaw);

export const domainSpanMeasuresSurvey: DomainSpanMeasuresSurvey = {
	id: '9c612187-581b-4be3-902c-9e8035d1d3b7',
	...spanMeasuresSurveyRaw,
};

export const SpanMeasuresSurvey = SpanMeasuresSurveyFactory.CreateSpanMeasuresSurvey(domainSpanMeasuresSurvey);
