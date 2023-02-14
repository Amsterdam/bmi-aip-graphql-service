import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SurveyAlreadyHasMeasuresException } from 'src/schema/survey/exceptions/survey-already-has-measures';
import { SurveyRepository } from 'src/schema/survey/survey.repository';

import { MeasureFactory } from '../measure.factory';
import { MeasureRepository } from '../measure.repository';
import { Measure } from '../models/measure.model';

import { CloneMeasuresFromPreviousSurveyCommand } from './clone-measures-from-previous-survey.command';

@CommandHandler(CloneMeasuresFromPreviousSurveyCommand)
export class CloneMeasuresFromPreviousSurveyHandler implements ICommandHandler<CloneMeasuresFromPreviousSurveyCommand> {
	constructor(private surveyRepository: SurveyRepository, private measureRepository: MeasureRepository) {}

	public async execute(command: CloneMeasuresFromPreviousSurveyCommand): Promise<Measure[]> {
		const previousSurveyId = await this.surveyRepository.findIdPreviousSurveyWithNen2767Decomposition(
			command.surveyId,
		);

		if (await this.surveyRepository.containsMeasures(command.surveyId)) {
			throw new SurveyAlreadyHasMeasuresException(command.surveyId);
		}

		if (previousSurveyId) {
			const measuresDb = await this.measureRepository.cloneMeasures(command.surveyId, previousSurveyId);
			const measures = measuresDb.map((measure) => MeasureFactory.CreateMeasure(measure));
			return measures;
		}

		return [] as Measure[];
	}
}
