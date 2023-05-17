import { UpdateSpanMeasuresSurveyInput } from '../dto/update-span-measures-survey.input';

export class UpdateSpanMeasuresSurveyCommand {
	public constructor(public readonly data: UpdateSpanMeasuresSurveyInput) {}
}
