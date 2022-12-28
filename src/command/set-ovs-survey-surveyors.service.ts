import { Injectable } from '@nestjs/common';

import { SetOvsSurveySurveyorsRepository } from './set-ovs-survey-surveyors.repository';
import type { SetOvsSurveySurveyorsReturnType } from './types';

@Injectable()
export class SetOvsSurveySurveyorsService {
	public constructor(private readonly repo: SetOvsSurveySurveyorsRepository) {}

	setOVSSurveySurveyors(): Promise<SetOvsSurveySurveyorsReturnType> {
		return this.repo.setOVSSurveySurveyors();
	}
}
