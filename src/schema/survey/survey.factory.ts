import { DbSurvey as DomainSurvey } from '../survey/types/survey.repository.interface';
import { Survey } from '../survey/models/survey.model';

export class SurveyFactory {
	static CreateSurvey({ id, description, status, inspectionStandardType }: DomainSurvey): Survey {
		const survey = new Survey();
		survey.id = id;
		survey.description = description;
		survey.status = status;
		survey.inspectionStandardType = inspectionStandardType;
		return survey;
	}
}
