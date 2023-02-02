import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Unit } from '../models/unit.model';
import { UnitService } from '../unit.service';

import { GetUnitByIdQuery } from './get-unit-by-id.query';

@QueryHandler(GetUnitByIdQuery)
export class GetUnitByIdHandler implements IQueryHandler<GetUnitByIdQuery> {
	constructor(private service: UnitService) {}

	public async execute(command: GetUnitByIdQuery): Promise<Unit> {
		return this.service.getUnitById(command.unitId);
	}
}
