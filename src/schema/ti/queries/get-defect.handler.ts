import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { DefectService } from '../defect.service';
import { Defect } from '../models/defect.model';

import { GetDefectQuery } from './get-defect.query';

@QueryHandler(GetDefectQuery)
export class GetDefectHandler implements IQueryHandler<GetDefectQuery> {
	constructor(private service: DefectService) {}

	public async execute({ defectId }: GetDefectQuery): Promise<Defect | null> {
		return defectId ? this.service.getDefect(defectId) : null;
	}
}
