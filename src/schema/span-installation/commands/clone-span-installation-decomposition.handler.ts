import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxRepository } from '../junction-box.repository';
import { SupportSystemRepository } from '../support-system.repository';
import { JunctionBox } from '../models/junction-box.model';
import { SupportSystem } from '../models/support-system.model';
import { JunctionBoxFactory } from '../junction-box.factory';
import { SupportSystemFactory } from '../support-system.factory';
import { SurveyRepository } from '../../survey/survey.repository';

import { CloneSpanInstallationDecompositionCommand } from './clone-span-installation-decomposition.command';

@CommandHandler(CloneSpanInstallationDecompositionCommand)
export class CloneSpanInstallationDecompositionHandler
	implements ICommandHandler<CloneSpanInstallationDecompositionCommand>
{
	constructor(
		private junctionBoxRepository: JunctionBoxRepository,
		private supportSystemRepository: SupportSystemRepository,
		private surveyRepository: SurveyRepository,
	) {}

	public async execute(command: CloneSpanInstallationDecompositionCommand): Promise<(JunctionBox | SupportSystem)[]> {
		const ovsSurveyId = await this.surveyRepository.findOVSSurveyIdBySpanObject(command.objectId);
		if (ovsSurveyId) {
			const junctionBoxes = await this.junctionBoxRepository.cloneJunctionBoxes(command.surveyId, ovsSurveyId);
			const supportSystems = await this.supportSystemRepository.cloneSupportSystems(
				command.surveyId,
				ovsSurveyId,
			);

			const resultJunctionBoxes = junctionBoxes.map((junctionBox) =>
				JunctionBoxFactory.CreateJunctionBox(junctionBox),
			);
			const resultSupportSystems = supportSystems.map((supportSystem) =>
				SupportSystemFactory.CreateSupportSystem(supportSystem),
			);
			return [...resultJunctionBoxes, ...resultSupportSystems];
		}

		return [] as (JunctionBox | SupportSystem)[];
	}
}
