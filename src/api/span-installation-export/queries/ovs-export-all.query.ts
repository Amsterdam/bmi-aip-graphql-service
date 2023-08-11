import { IQuery } from '@nestjs/cqrs';
import { Response } from 'express';

export class OVSExportAllQuery implements IQuery {
	public constructor(readonly response: Response) {}
}
