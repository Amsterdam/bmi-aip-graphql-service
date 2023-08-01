import { IQuery } from '@nestjs/cqrs';

export class ExportBatchDataQuery implements IQuery {
	public constructor(public readonly batchId: string) {}
}
