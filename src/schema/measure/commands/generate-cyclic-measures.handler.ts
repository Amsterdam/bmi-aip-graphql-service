import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { CyclicMeasure } from '../models/cyclic-measure.model';
import { GenerateCyclicMeasuresCommand } from '../commands/generate-cyclic-measures.command';
import { CyclicMeasureFactory } from '../cyclic-measure.factory';
import { Unit } from '../../decomposition/types/unit.repository.interface';
import { ObjectTypeUnitCode } from '../../decomposition/types/object-type-unit-code.repository.interface';
import { DefaultMaintenanceMeasure } from '../../default-maintenance-measure/models/default-maintenance-measure.model';
import { castCyclicMeasureType } from '../utils/cast-cyclic-measure-type';
import { UnitRepository } from '../../decomposition/unit.Repository';
import { ObjectTypeUnitCodeRepository } from '../../decomposition/object-type-unit-code.repository';
import { DefaultMaintenanceMeasureRepository } from '../../default-maintenance-measure/default-maintenance-measure.repository';
import { CyclicMeasure as DomainCyclicMeasure } from '../types/cyclic-measure.repository.interface';

@CommandHandler(GenerateCyclicMeasuresCommand)
export class GenerateCyclicMeasuresHandler implements ICommandHandler<GenerateCyclicMeasuresCommand> {
	constructor(
		private cyclicMeasureRepository: CyclicMeasureRepository,
		private unitRepository: UnitRepository,
		private defaultMaintenanceMeasureRepository: DefaultMaintenanceMeasureRepository,
		private objectTypeUnitCodeRepository: ObjectTypeUnitCodeRepository,
	) {}

	public async execute(command: GenerateCyclicMeasuresCommand): Promise<CyclicMeasure[]> {
		const cyclicMeasures: CyclicMeasure[] = [];
		const units: Unit[] = await this.unitRepository.getUnitsBySurveyId(command.surveyId);

		if (units) {
			for (const unit of units) {
				const objectTypeUnitCode: ObjectTypeUnitCode = await this.objectTypeUnitCodeRepository.findByCode(
					unit.code,
				);

				const defaultMaintenanceMeasures: DefaultMaintenanceMeasure[] =
					await this.defaultMaintenanceMeasureRepository.getDefaultMaintenanceMeasureByObjectTypeUnitCodeId(
						objectTypeUnitCode.id,
					);
				if (defaultMaintenanceMeasures) {
					for (const defaultMaintenanceMeasure of defaultMaintenanceMeasures) {
						const existingCyclicMeasure = await this.cyclicMeasureRepository.findExistingCyclicMeasure(
							command.surveyId,
							unit.id,
							defaultMaintenanceMeasure.id,
						);

						if (!existingCyclicMeasure) {
							const data: DomainCyclicMeasure = {
								id: '',
								surveyId: command.surveyId,
								unitId: unit.id,
								maintenanceType: castCyclicMeasureType(defaultMaintenanceMeasure.maintenanceType),
								cycle: defaultMaintenanceMeasure.cycle,
								unitPrice: defaultMaintenanceMeasure.unitPrice,
								quantityUnitOfMeasurement: defaultMaintenanceMeasure.quantityUnitOfMeasurement,
								defaultMaintenanceMeasureId: defaultMaintenanceMeasure.id,
								deleted_at: undefined,
								planYear: 0,
								finalPlanYear: 0,
								costSurcharge: 0,
								remarks: '',
								failureModeId: '',
								defectId: '',
							};

							cyclicMeasures.push(
								(await this.cyclicMeasureRepository.createCyclicMeasure(
									CyclicMeasureFactory.CreateCyclicMeasure(data),
								)) as unknown as CyclicMeasure,
							);
						} else {
							const data: DomainCyclicMeasure = {
								...existingCyclicMeasure,
								cycle: defaultMaintenanceMeasure.cycle,
								unitPrice: defaultMaintenanceMeasure.unitPrice,
								quantityUnitOfMeasurement: defaultMaintenanceMeasure.quantityUnitOfMeasurement,
								maintenanceType: castCyclicMeasureType(defaultMaintenanceMeasure.maintenanceType),
							};

							cyclicMeasures.push(
								(await this.cyclicMeasureRepository.updateCyclicMeasure(
									CyclicMeasureFactory.CreateCyclicMeasure(data),
								)) as unknown as CyclicMeasure,
							);
						}
					}
				}
			}
		}
		return cyclicMeasures;
	}
}
