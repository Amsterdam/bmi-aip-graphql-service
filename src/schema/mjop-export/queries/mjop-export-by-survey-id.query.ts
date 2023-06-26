import { Response } from 'express';

export class MJOPExportBySurveyIdQuery {
	public constructor(public readonly surveyId: string, readonly response: Response) {}
}
