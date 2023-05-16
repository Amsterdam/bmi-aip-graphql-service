import { Injectable } from '@nestjs/common';

import { SpanMeasuresSurvey } from './models/span-measures-survey.model';
import { SpanMeasuresSurveyFactory } from './span-measures-survey.factory';
import { SpanMeasuresSurveyRepository } from './span-measures-survey.repository';

@Injectable()
export class SpanMeasuresSurveyService {
	public constructor(private readonly spanMeasuresSurveyRepository: SpanMeasuresSurveyRepository) {}

	async getSpanMeasuresSurvey(surveyId: string): Promise<SpanMeasuresSurvey> {
		return SpanMeasuresSurveyFactory.CreateSpanMeasuresSurvey(
			await this.spanMeasuresSurveyRepository.getSpanMeasuresSurvey(surveyId),
		);
	}
}
