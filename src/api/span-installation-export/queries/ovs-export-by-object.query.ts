import { IQuery } from '@nestjs/cqrs';
import { Response } from 'express';

export class OVSExportByObjectQuery implements IQuery {
	public constructor(readonly response: Response, public objectId: string) {}
}
