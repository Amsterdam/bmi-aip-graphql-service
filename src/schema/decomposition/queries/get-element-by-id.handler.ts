import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Element } from '../models/element.model';
import { ElementService } from '../element.service';

import { GetElementByIdQuery } from './get-element-by-id.query';

@QueryHandler(GetElementByIdQuery)
export class GetElementByIdHandler implements IQueryHandler<GetElementByIdQuery> {
	constructor(private service: ElementService) {}

	public async execute(command: GetElementByIdQuery): Promise<Element> {
		return this.service.getElementById(command.elementId);
	}
}
