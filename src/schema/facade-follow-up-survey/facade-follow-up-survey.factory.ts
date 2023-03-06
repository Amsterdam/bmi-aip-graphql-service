import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';
import { FacadeFollowUpSurvey as DomainFacadeFollowUpSurvey } from './types/facade-follow-up-survey.repository.interface';

export class FacadeFollowUpSurveyFactory {
	static createFacadeFollowUpSurvey({
		id,
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		created_at: created_at,
		updated_at: updated_at,
		deleted_at: deleted_at,
	}: DomainFacadeFollowUpSurvey): FacadeFollowUpSurvey {
		const followUpfacadeSurvey = new FacadeFollowUpSurvey();
		followUpfacadeSurvey.id = id;
		followUpfacadeSurvey.surveyId = surveyId;
		followUpfacadeSurvey.preparedAuthor = preparedAuthor;
		followUpfacadeSurvey.preparedDate = preparedDate;
		followUpfacadeSurvey.verifiedAuthor = verifiedAuthor;
		followUpfacadeSurvey.verifiedDate = verifiedDate;
		followUpfacadeSurvey.created_at = created_at instanceof Date ? created_at.toUTCString() : null;
		followUpfacadeSurvey.updated_at = updated_at instanceof Date ? updated_at.toUTCString() : null;
		followUpfacadeSurvey.deleted_at = deleted_at instanceof Date ? deleted_at.toUTCString() : null;

		return followUpfacadeSurvey;
	}
}
