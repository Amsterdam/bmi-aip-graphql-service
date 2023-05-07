import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SurveyRepository } from 'src/schema/survey/survey.repository';

import { JunctionBoxRepository } from '../junction-box.repository';
import { JunctionBox } from '../types/junction-box.repository.interface';

import { CloneJunctionBoxesFromOVSSurveyCommand } from './clone-junction-boxes-from-ovs-survey.command';

@CommandHandler(CloneJunctionBoxesFromOVSSurveyCommand)
export class CloneJunctionBoxesFromOVSSurveyHandler implements ICommandHandler<CloneJunctionBoxesFromOVSSurveyCommand> {
	constructor(private junctionBoxRepository: JunctionBoxRepository, private surveyRepository: SurveyRepository) {}

	public async execute(command: CloneJunctionBoxesFromOVSSurveyCommand): Promise<JunctionBox[]> {
		const ovsSurveyId = await this.surveyRepository.findOVSSurveyIdBySpanObject(command.objectId);

		if (ovsSurveyId) {
			return this.junctionBoxRepository.cloneJunctionBoxes(command.surveyId, ovsSurveyId);
		}

		return [] as JunctionBox[];
	}
}
