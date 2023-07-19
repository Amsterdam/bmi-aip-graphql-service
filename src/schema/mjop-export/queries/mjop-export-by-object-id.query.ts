import { Response } from 'express';

export class MJOPExportByObjectIdQuery {
	public constructor(public readonly objectId: string, readonly response: Response) {}
}
