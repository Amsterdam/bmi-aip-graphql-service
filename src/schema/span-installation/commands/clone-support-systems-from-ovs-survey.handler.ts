import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SurveyRepository } from 'src/schema/survey/survey.repository';

import { SupportSystemRepository } from '../support-system.repository';
import { SupportSystem } from '../types/support-system.repository.interface';

import { CloneSupportSystemsFromOVSSurveyCommand } from './clone-support-systems-from-ovs-survey.command';

@CommandHandler(CloneSupportSystemsFromOVSSurveyCommand)
export class CloneSupportSystemsFromOVSSurveyHandler
	implements ICommandHandler<CloneSupportSystemsFromOVSSurveyCommand>
{
	constructor(private supportSystemRepository: SupportSystemRepository, private surveyRepository: SurveyRepository) {}

	public async execute(command: CloneSupportSystemsFromOVSSurveyCommand): Promise<SupportSystem[]> {
		const ovsSurveyId = await this.surveyRepository.findOVSSurveyIdBySpanObject(command.objectId);

		if (ovsSurveyId) {
			return this.supportSystemRepository.cloneSupportSystems(command.surveyId, ovsSurveyId);
		}

		return [] as SupportSystem[];
	}
}
