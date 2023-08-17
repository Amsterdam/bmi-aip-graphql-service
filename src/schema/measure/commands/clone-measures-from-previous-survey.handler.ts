import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import PQueue from 'p-queue';

import { SurveyAlreadyHasMeasuresException } from '../../survey/exceptions/survey-already-has-measures.exception';
import { SurveyAlreadyHasCyclicMeasuresException } from '../../survey/exceptions/survey-already-has-cyclic-measures.exception';
import { MeasureRepository } from '../measure.repository';
import { Measure } from '../models/measure.model';
import { DecompositionCloneNotFoundException } from '../../decomposition/exceptions/decomposition-clone-not-found.exception';
import { MeasureService } from '../measure.service';
import { UnitFactory } from '../../decomposition/unit.factory';
import { ManifestationFactory } from '../../decomposition/manifestation.factory';
import { CyclicMeasure } from '../models/cyclic-measure.model';
import { CyclicMeasureService } from '../cyclic-measure.service';
import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { MeasuresAndCyclicMeasuresCollection } from '../models/measures-and-cyclic-measures-collection.model';
import { SurveyRepository } from '../../survey/survey.repository';
import { UnitRepository } from '../../decomposition/unit.repository';
import { ManifestationRepository } from '../../decomposition/manifestation.repository';
import { Manifestation } from '../../decomposition/models/manifestation.model';
import { Unit } from '../../decomposition/models/unit.model';

import { CloneMeasuresFromPreviousSurveyCommand } from './clone-measures-from-previous-survey.command';

@CommandHandler(CloneMeasuresFromPreviousSurveyCommand)
export class CloneMeasuresFromPreviousSurveyHandler implements ICommandHandler<CloneMeasuresFromPreviousSurveyCommand> {
	constructor(
		private surveyRepository: SurveyRepository,
		private measureRepository: MeasureRepository,
		private unitRepository: UnitRepository,
		private manifestationRepository: ManifestationRepository,
		private measureService: MeasureService,
		private cyclicMeasureService: CyclicMeasureService,
		private cyclicMeasureRepository: CyclicMeasureRepository,
	) {}

	public async execute({
		surveyId,
	}: CloneMeasuresFromPreviousSurveyCommand): Promise<MeasuresAndCyclicMeasuresCollection> {
		const previousSurveyId = await this.surveyRepository.findIdPreviousNen2767OrFmecaSurvey(surveyId);

		if (await this.measureRepository.surveyContainsMeasures(surveyId)) {
			throw new SurveyAlreadyHasMeasuresException(surveyId);
		}

		if (await this.cyclicMeasureRepository.surveyContainsMeasures(surveyId)) {
			throw new SurveyAlreadyHasCyclicMeasuresException(surveyId);
		}

		if (previousSurveyId) {
			await this.cloneMeasures(surveyId, previousSurveyId);
			await this.cloneCyclicMeasures(surveyId, previousSurveyId);
		}

		return {
			measures: await this.measureService.findMeasures(surveyId),
			cyclicMeasures: await this.cyclicMeasureService.findCyclicMeasures(surveyId),
		};
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
				await this.measureRepository.createMeasure({
					...measure,
					surveyId,
				});
			});
		});
		await queue.onIdle();

		return this.measureService.findMeasures(surveyId);
	}

	public async cloneCyclicMeasures(surveyId: string, previousSurveyId: string): Promise<CyclicMeasure[]> {
		const cyclicMeasures = await this.cyclicMeasureService.findCyclicMeasures(previousSurveyId);
		const queue = new PQueue({ concurrency: 1 });

		cyclicMeasures.forEach((cyclicMeasure) => {
			queue.add(async () => {
				// Find linked units and manifestations ids
				if (cyclicMeasure.unitId) {
					const unit = await this.findLastClonedUnit(cyclicMeasure.unitId, surveyId);
					cyclicMeasure.unitId = unit.id;
				}

				// Duplicate measure record but with new id and different surveyId
				await this.cyclicMeasureRepository.createCyclicMeasure({
					...cyclicMeasure,
					surveyId,
					remarks: cyclicMeasure.remarks,
					deletedAt: null,
				});
			});
		});
		await queue.onIdle();

		return this.cyclicMeasureService.findCyclicMeasures(surveyId);
	}

	async findLastClonedUnit(unitId: string, surveyId: string): Promise<Unit> {
		const unit = await this.unitRepository.getUnitById(unitId);
		const lastCreated = await this.unitRepository.getLastCreatedForSurvey(unit.permanentId ?? unit.id, surveyId);

		if (lastCreated === null) {
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

		if (lastCreated === null) {
			throw new DecompositionCloneNotFoundException(surveyId);
		}

		return ManifestationFactory.CreateManifestation(lastCreated);
	}
}
