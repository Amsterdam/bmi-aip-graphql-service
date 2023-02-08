import { Injectable } from '@nestjs/common';

import { DefectRepository } from './defect.repository';
import { DefectFactory } from './defect.factory';

@Injectable()
export class DefectService {
	public constructor(private readonly defectRepo: DefectRepository) {}

	public async getDefect(defectId: string) {
		return DefectFactory.CreateDefect(await this.defectRepo.getDefect(defectId));
	}
}
