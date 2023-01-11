import { ArkSurvey } from './models/ark-survey.model';
import { ArkSurvey as DomainArkSurvey } from './types/ark-survey.repository.interface';

export class ArkSurveyFactory {
	static createArkSurvey({
		id,
		surveyId,
		created_at: created_at,
		updated_at: updated_at,
		deleted_at: deleted_at,
		ArkGeographyStart: ArkGeographyStart,
		ArkGeographyRDStart: ArkGeographyRDStart,
		ArkGeographyEnd: ArkGeographyEnd,
		ArkGeographyRDEnd: ArkGeographyRDEnd,
	}: DomainArkSurvey): ArkSurvey {
		const arkSurvey = new ArkSurvey();
		arkSurvey.id = id;
		arkSurvey.surveyId = surveyId;

		// Allow geographyRD to be null by not defining it
		const parsedArkGeographyRDStart = JSON.parse(JSON.stringify(ArkGeographyRDStart));
		const parsedArkGeographyRDEnd = JSON.parse(JSON.stringify(ArkGeographyRDEnd));

		if (parsedArkGeographyRDStart?.type) {
			arkSurvey.ArkGeographyRDStart = parsedArkGeographyRDStart;
		}

		if (parsedArkGeographyRDEnd?.type) {
			arkSurvey.ArkGeographyRDEnd = parsedArkGeographyRDEnd;
		}

		arkSurvey.ArkGeographyStart = ArkGeographyStart;
		arkSurvey.ArkGeographyEnd = ArkGeographyEnd;

		arkSurvey.created_at = created_at instanceof Date ? created_at.toUTCString() : null;
		arkSurvey.updated_at = updated_at instanceof Date ? updated_at.toUTCString() : null;
		arkSurvey.deleted_at = deleted_at instanceof Date ? deleted_at.toUTCString() : null;

		return arkSurvey;
	}
}
