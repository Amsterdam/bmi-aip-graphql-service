import { SurveyDataFieldType } from '../types/surveyDataFieldType';

export class FindSurveyDataByFieldAndIdQuery {
	public constructor(public readonly id: string, public field: SurveyDataFieldType) {}
}
