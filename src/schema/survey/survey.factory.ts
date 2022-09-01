import { DbSurvey as DomainSurvey } from '../survey/types/survey.repository.interface';
import { PartialBy } from '../../utils/utils';

import { Survey } from './models/survey.model';

type SurveyType =
	| 'id'
	| 'surveryedOn'
	| 'updatedOn'
	| 'status'
	| 'description'
	| 'dUri'
	| 'summaryAndAdvice'
	| 'operatorCompanyId'
	| 'surveyorCompanyId';

export class SurveyFactory {
	static CreateSurvey({
		id,
		description,
		status,
		inspectionStandardType,
	}: PartialBy<DomainSurvey, SurveyType>): Survey {
		const survey = new Survey();
		survey.id = id;
		survey.description = description;
		survey.status = status;
		survey.inspectionStandardType = inspectionStandardType;
		return survey;
	}
}
