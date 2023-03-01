import { FacadeSurvey } from './models/facade-survey.model';
import { FacadeSurvey as DomainFacadeSurvey } from './types/facade-survey.repository.interface';

export class FacadeSurveyFactory {
	static createFacadeSurvey({
		id,
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		remarks,
		created_at: created_at,
		updated_at: updated_at,
		deleted_at: deleted_at,
	}: DomainFacadeSurvey): FacadeSurvey {
		const facadeSurvey = new FacadeSurvey();
		facadeSurvey.id = id;
		facadeSurvey.surveyId = surveyId;
		facadeSurvey.preparedAuthor = preparedAuthor;
		facadeSurvey.preparedDate = preparedDate;
		facadeSurvey.verifiedAuthor = verifiedAuthor;
		facadeSurvey.verifiedDate = verifiedDate;
		facadeSurvey.remarks = remarks;
		facadeSurvey.created_at = created_at instanceof Date ? created_at.toUTCString() : null;
		facadeSurvey.updated_at = updated_at instanceof Date ? updated_at.toUTCString() : null;
		facadeSurvey.deleted_at = deleted_at instanceof Date ? deleted_at.toUTCString() : null;

		return facadeSurvey;
	}
}
