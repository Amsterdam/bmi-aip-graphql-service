import { ArkSurveyGeographyData } from './models/ark-survey-geography-data.model';
import { ArkSurveyGeographyData as DomainArkSurveyGeographyData } from './types/ark-survey-geography-data.repository.interface';

export class ArkSurveyGeographyDataFactory {
	static createArkSurveyGeographyData({
		id,
		surveyId,
		created_at: created_at,
		updated_at: updated_at,
		deleted_at: deleted_at,
		ArkGeographyStart: ArkGeographyStart,
		ArkGeographyRDStart: ArkGeographyRDStart,
		ArkGeographyEnd: ArkGeographyEnd,
		ArkGeographyRDEnd: ArkGeographyRDEnd,
	}: DomainArkSurveyGeographyData): ArkSurveyGeographyData {
		const arkSurveyGeographyData = new ArkSurveyGeographyData();
		arkSurveyGeographyData.id = id;
		arkSurveyGeographyData.surveyId = surveyId;

		// Allow geographyRD to be null by not defining it
		const parsedArkGeographyRDStart = JSON.parse(JSON.stringify(ArkGeographyRDStart));
		const parsedArkGeographyRDEnd = JSON.parse(JSON.stringify(ArkGeographyRDEnd));

		if (parsedArkGeographyRDStart?.type) {
			arkSurveyGeographyData.ArkGeographyRDStart = parsedArkGeographyRDStart;
		}

		if (parsedArkGeographyRDEnd?.type) {
			arkSurveyGeographyData.ArkGeographyRDEnd = parsedArkGeographyRDEnd;
		}

		arkSurveyGeographyData.ArkGeographyStart = ArkGeographyStart;
		arkSurveyGeographyData.ArkGeographyEnd = ArkGeographyEnd;

		arkSurveyGeographyData.created_at = created_at instanceof Date ? created_at.toUTCString() : null;
		arkSurveyGeographyData.updated_at = updated_at instanceof Date ? updated_at.toUTCString() : null;
		arkSurveyGeographyData.deleted_at = deleted_at instanceof Date ? deleted_at.toUTCString() : null;

		return arkSurveyGeographyData;
	}
}
