import { InspectionStandardDataFactory } from './inspection-standard-data.factory';
import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';
import { FacadeFollowUpSurvey as DomainFacadeFollowUpSurvey } from './types/facade-follow-up-survey.repository.interface';

export class FacadeFollowUpSurveyFactory {
	static createFacadeFollowUpSurvey({
		id,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		inspectionStandardData,
	}: DomainFacadeFollowUpSurvey): FacadeFollowUpSurvey {
		const followUpFacadeSurvey = new FacadeFollowUpSurvey();
		followUpFacadeSurvey.id = id;
		followUpFacadeSurvey.preparedAuthor = preparedAuthor;
		followUpFacadeSurvey.preparedDate = preparedDate;
		followUpFacadeSurvey.verifiedAuthor = verifiedAuthor;
		followUpFacadeSurvey.verifiedDate = verifiedDate;
		followUpFacadeSurvey.inspectionStandardData =
			InspectionStandardDataFactory.createInspectionStandardDataFromJSONB(inspectionStandardData);

		return followUpFacadeSurvey;
	}
}
