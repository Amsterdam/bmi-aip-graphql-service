import { Response } from 'express';

export class MjopExportBySurveyIdQuery {
	public constructor(public readonly surveyId: string, readonly response: Response) {}
}
