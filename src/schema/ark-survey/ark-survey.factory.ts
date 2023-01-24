import { ArkSurvey } from './models/ark-survey.model';
import { ArkSurvey as DomainArkSurvey } from './types/ark-survey.repository.interface';

export class ArkSurveyFactory {
	static createArkSurvey({
		id,
		surveyId,
		created_at: createdAt,
		updated_at: updatedAt,
		deleted_at: deletedAt,
		arkGeographyStart: arkGeographyStart,
		arkGeographyRDStart: arkGeographyRDStart,
		arkGeographyEnd: arkGeographyEnd,
		arkGeographyRDEnd: arkGeographyRDEnd,
	}: DomainArkSurvey): ArkSurvey {
		const arkSurvey = new ArkSurvey();
		arkSurvey.id = id;
		arkSurvey.surveyId = surveyId;

		// Allow geographyRD to be null by not defining it
		const parsedarkGeographyRDStart = JSON.parse(JSON.stringify(arkGeographyRDStart));
		const parsedarkGeographyRDEnd = JSON.parse(JSON.stringify(arkGeographyRDEnd));

		if (parsedarkGeographyRDStart?.type) {
			arkSurvey.arkGeographyRDStart = parsedarkGeographyRDStart;
		}

		if (parsedarkGeographyRDEnd?.type) {
			arkSurvey.arkGeographyRDEnd = parsedarkGeographyRDEnd;
		}

		arkSurvey.arkGeographyStart = arkGeographyStart;
		arkSurvey.arkGeographyEnd = arkGeographyEnd;

		arkSurvey.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		arkSurvey.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		arkSurvey.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;

		return arkSurvey;
	}
}
