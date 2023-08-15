import { IQuery } from '@nestjs/cqrs';
import { Response } from 'express';

export class OVSExportByBatchQuery implements IQuery {
	public constructor(readonly response: Response, public batchId: string) {}
}
