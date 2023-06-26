import { Response } from 'express';

export class MJOPExportByBatchIdQuery {
	public constructor(
		public readonly batchId: string,
		public readonly inspectionStandardType: string,
		readonly response: Response,
	) {}
}
