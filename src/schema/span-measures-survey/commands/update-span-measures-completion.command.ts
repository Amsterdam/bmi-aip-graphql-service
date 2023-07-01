import { UpdateSpanMeasuresSurveyInput } from '../dto/update-span-measures-survey.input';

export class UpdateSpanMeasuresCompletionCommand {
	public constructor(public readonly data: UpdateSpanMeasuresSurveyInput) {}
}
