import { InspectionStandardDataFactory } from './inspection-standard-data.factory';
import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';
import { FacadeFollowUpSurvey as DomainFacadeFollowUpSurvey } from './types/facade-follow-up-survey.repository.interface';

export class FacadeFollowUpSurveyFactory {
	static CreateFacadeFollowUpSurvey({
		id,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		inspectionStandardData,
	}: DomainFacadeFollowUpSurvey): FacadeFollowUpSurvey {
		const facadeFollowUpSurvey = new FacadeFollowUpSurvey();
		facadeFollowUpSurvey.id = id;
		facadeFollowUpSurvey.preparedAuthor = preparedAuthor;
		facadeFollowUpSurvey.preparedDate = preparedDate;
		facadeFollowUpSurvey.verifiedAuthor = verifiedAuthor;
		facadeFollowUpSurvey.verifiedDate = verifiedDate;
		facadeFollowUpSurvey.inspectionStandardData =
			InspectionStandardDataFactory.CreateInspectionStandardDataFromJSONB(inspectionStandardData);

		return facadeFollowUpSurvey;
	}
}
