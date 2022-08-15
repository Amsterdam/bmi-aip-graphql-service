import { Injectable } from '@nestjs/common';

import { JunctionBox } from './models/junction-box.model';
import { JunctionBoxFactory } from './junction-box.factory';
import { JunctionBoxRepository } from './junction-box.repository';

@Injectable()
export class JunctionBoxService {
	public constructor(private readonly junctionBoxRepo: JunctionBoxRepository) {}

	async getJunctionBoxes(surveyId: string): Promise<JunctionBox[]> {
		return (await this.junctionBoxRepo.getJunctionBoxes(surveyId)).map((junctionBox) =>
			JunctionBoxFactory.CreateJunctionBox(junctionBox),
		);
	}
}
