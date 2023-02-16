import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import PQueue from 'p-queue';
import { SurveyRepository } from 'src/schema/survey/survey.repository';
import { Unit } from 'src/schema/decomposition/models/unit.model';
import { ManifestationRepository } from 'src/schema/decomposition/manifestation.repository';
import { UnitRepository } from 'src/schema/decomposition/unit.repository';
import { Manifestation } from 'src/schema/decomposition/models/manifestation.model';

import { SurveyAlreadyHasMeasuresException } from '../../survey/exceptions/survey-already-has-measures';
import { MeasureRepository } from '../measure.repository';
import { Measure } from '../models/measure.model';
import { DecompositionCloneNotFoundException } from '../../decomposition/exceptions/decomposition-clone-not-found.exception';
import { MeasureService } from '../measure.service';
import { UnitFactory } from '../../decomposition/unit.factory';
import { ManifestationFactory } from '../../decomposition/manifestation.factory';

import { CloneMeasuresFromPreviousSurveyCommand } from './clone-measures-from-previous-survey.command';

@CommandHandler(CloneMeasuresFromPreviousSurveyCommand)
export class CloneMeasuresFromPreviousSurveyHandler implements ICommandHandler<CloneMeasuresFromPreviousSurveyCommand> {
	constructor(
		private surveyRepository: SurveyRepository,
		private measureRepository: MeasureRepository,
		private unitRepository: UnitRepository,
		private manifestationRepository: ManifestationRepository,
		private measureService: MeasureService,
	) {}

	public async execute(command: CloneMeasuresFromPreviousSurveyCommand): Promise<Measure[]> {
		const previousSurveyId = await this.surveyRepository.findIdPreviousNen2767OrFmecaSurvey(command.surveyId);

		if (await this.measureRepository.surveyContainsMeasures(command.surveyId)) {
			throw new SurveyAlreadyHasMeasuresException(command.surveyId);
		}

		if (previousSurveyId) {
			await this.cloneMeasures(command.surveyId, previousSurveyId);
			return this.measureService.findMeasures(command.surveyId);
		}

		return [];
	}

	public async cloneMeasures(surveyId: string, previousSurveyId: string): Promise<Measure[]> {
		const measures = await this.measureService.findMeasures(previousSurveyId);
		const queue = new PQueue({ concurrency: 1 });

		measures.forEach((measure) => {
			queue.add(async () => {
				// Find linked units and manifestations ids
				if (measure.unitId) {
					const unit = await this.findLastClonedUnit(measure.unitId, surveyId);
					measure.unitId = unit.id;
				} else if (measure.manifestationId) {
					const manifestation = await this.findLastClonedManifestation(measure.manifestationId, surveyId);
					measure.manifestationId = manifestation.id;
				}
				// Duplicate measure record but with new id and different surveyId
				await this.measureService.createMeasure(measure, surveyId);
			});
		});
		await queue.onIdle();

		return this.measureService.findMeasures(surveyId);
	}

	async findLastClonedUnit(unitId: string, surveyId: string): Promise<Unit> {
		const unit = await this.unitRepository.getUnitById(unitId);
		const lastCreated = await this.unitRepository.getLastCreatedForSurvey(unit.permanentId ?? unit.id, surveyId);

		if (lastCreated == null) {
			throw new DecompositionCloneNotFoundException(surveyId);
		}

		return UnitFactory.CreateUnit(lastCreated);
	}

	async findLastClonedManifestation(manifestationId: string, surveyId: string): Promise<Manifestation> {
		const manifestation = await this.manifestationRepository.getManifestationById(manifestationId);
		const lastCreated = await this.manifestationRepository.getLastCreatedForSurvey(
			manifestation.permanentId ?? manifestation.id,
			surveyId,
		);

		if (lastCreated == null) {
			throw new DecompositionCloneNotFoundException(surveyId);
		}

		return ManifestationFactory.CreateManifestation(lastCreated);
	}
}
