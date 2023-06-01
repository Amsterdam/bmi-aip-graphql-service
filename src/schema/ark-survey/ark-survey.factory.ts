import { ArkSurvey } from './models/ark-survey.model';
import { ReachSegment } from './models/reach-segment.model';
import { ArkSurveyWithReachSegments, ArkSurvey as DomainArkSurvey } from './types/ark-survey.repository.interface';

export class ArkSurveyFactory {
	static createArkSurvey({
		id,
		surveyId,
		created_at: created_at,
		updated_at: updated_at,
		deleted_at: deleted_at,
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

		arkSurvey.created_at = created_at instanceof Date ? created_at.toUTCString() : null;
		arkSurvey.updated_at = updated_at instanceof Date ? updated_at.toUTCString() : null;
		arkSurvey.deleted_at = deleted_at instanceof Date ? deleted_at.toUTCString() : null;

		return arkSurvey;
	}

	static createArkSurveyWithReachSegments({
		id,
		surveyId,
		created_at: created_at,
		updated_at: updated_at,
		deleted_at: deleted_at,
		reachSegments: reachSegments,
		arkGeographyStart: arkGeographyStart,
		arkGeographyRDStart: arkGeographyRDStart,
		arkGeographyEnd: arkGeographyEnd,
		arkGeographyRDEnd: arkGeographyRDEnd,
		arkSurveyReachSegments: arkSurveyReachSegments,
	}: ArkSurveyWithReachSegments & { arkSurveyReachSegments: ReachSegment[] }): ArkSurvey {
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

		arkSurvey.reachSegments = arkSurveyReachSegments;

		arkSurvey.created_at = created_at instanceof Date ? created_at.toUTCString() : null;
		arkSurvey.updated_at = updated_at instanceof Date ? updated_at.toUTCString() : null;
		arkSurvey.deleted_at = deleted_at instanceof Date ? deleted_at.toUTCString() : null;

		return arkSurvey;
	}
}
