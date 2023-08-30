import { Injectable } from '@nestjs/common';

import { JunctionBoxSurveyRepository } from '../span-installation-survey/junction-box-survey.repository';
import { JunctionBoxSurvey } from '../span-installation-survey/models/junction-box-survey.model';
import { JunctionBoxSurveyFactory } from '../span-installation-survey/junction-box-survey.factory';

import { JunctionBox } from './models/junction-box.model';
import { JunctionBoxFactory } from './junction-box.factory';
import { JunctionBoxRepository } from './junction-box.repository';

@Injectable()
export class JunctionBoxService {
	public constructor(private readonly junctionBoxRepo: JunctionBoxRepository) {}

	async findByObject(objectId: string): Promise<JunctionBox[] | null> {
		return (await this.junctionBoxRepo.findByObject(objectId)).map((junctionBox) =>
			JunctionBoxFactory.CreateJunctionBox(junctionBox),
		);
	}

	async getJunctionBoxes(surveyId: string): Promise<JunctionBox[]> {
		return (await this.junctionBoxRepo.getJunctionBoxes(surveyId)).map((junctionBox) =>
			JunctionBoxFactory.CreateJunctionBox(junctionBox),
		);
	}
}
