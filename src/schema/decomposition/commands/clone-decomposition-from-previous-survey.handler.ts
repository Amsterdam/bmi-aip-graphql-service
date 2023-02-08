import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DecompositionRepository } from '../decomposition.repository';
import { Element } from '../models/element.model';
import { SurveyHasDecompositionException } from '../exceptions/survey-has-decomposition.exception';

import { CloneDecompositionFromPreviousSurveyCommand } from './clone-decomposition-from-previous-survey.command';

@CommandHandler(CloneDecompositionFromPreviousSurveyCommand)
export class CloneDecompositionFromPreviousSurveyHandler
	implements ICommandHandler<CloneDecompositionFromPreviousSurveyCommand>
{
	constructor(private decompositionRepository: DecompositionRepository) {}

	public async execute(command: CloneDecompositionFromPreviousSurveyCommand): Promise<Element[]> {
		const previousSurveyId = await this.decompositionRepository.findPreviousSurveyId(command.surveyId);

		if (await this.decompositionRepository.checkIfAlreadyMigrated(command.surveyId)) {
			throw new SurveyHasDecompositionException(command.surveyId);
		}

		if (previousSurveyId) {
			return this.decompositionRepository.cloneDecomposition(command.surveyId, previousSurveyId);
		}

		return [] as Element[];
	}
}
