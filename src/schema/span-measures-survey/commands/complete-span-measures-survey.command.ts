import { UpdateSpanMeasuresSurveyInput } from '../dto/update-span-measures-survey.input';

export class CompleteSpanMeasuresSurveyCommand {
	public constructor(public readonly data: UpdateSpanMeasuresSurveyInput) {}
}
