import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Unit } from 'src/schema/decomposition/types/unit.repository.interface';

import { ObjectTypeUnitCode } from '../decomposition/types/object-type-unit-code.repository.interface';
import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';
import { DefaultMaintenanceMeasureService } from '../default-maintenance-measure/default-maintenance-measure.service';
import { DefaultMaintenanceMeasure } from '../default-maintenance-measure/models/default-maintenance-measure.model';

import { CyclicMeasure, ICyclicMeasureRepository } from './types/cyclic-measure.repository.interface';
import { CreateCyclicMeasureInput } from './dto/create-cyclic-measure.input';
import { GenerateCyclicMeasureInput } from './dto/generate-cyclic-measure.input';
import { UpdateCyclicMeasureInput } from './dto/update-cyclic-measure.input';

@Injectable()
export class CyclicMeasureRepository implements ICyclicMeasureRepository {
	public constructor(
		private readonly prisma: PrismaService,
		private defaultMaintenanceMeasureService: DefaultMaintenanceMeasureService,
	) {}

	async createCyclicMeasure({
		maintenanceType,
		surveyId,
		unitId,
		planYear,
		finalPlanYear,
		costSurcharge,
		remarks,
		cycle,
		unitPrice,
		quantityUnitOfMeasurement,
		defaultMaintenanceMeasureId,
		defectId,
		failureModeId,
	}: CreateCyclicMeasureInput): Promise<CyclicMeasure> {
		const data: Prisma.cyclicMeasuresCreateInput = {
			id: newId(),
			maintenanceType: maintenanceType,
			surveys: { connect: { id: surveyId } },
			units: { connect: { id: unitId } },
			planYear,
			finalPlanYear,
			costSurcharge,
			remarks,
			cycle,
			unitPrice,
			quantityUnitOfMeasurement: quantityUnitOfMeasurement,
			defaultMaintenanceMeasures: { connect: { id: defaultMaintenanceMeasureId } },
			defects: {
				connect: {
					id: defectId,
				},
			},
			failureModes: {
				connect: {
					id: failureModeId,
				},
			},
		};

		return this.prisma.cyclicMeasures.create({ data });
	}

	async findCyclicMeasures(surveyId: string): Promise<CyclicMeasure[]> {
		return this.prisma.cyclicMeasures.findMany({
			where: {
				surveyId,
			},
		});
	}

	async generateCyclicMeasureForUnit({ surveyId }: GenerateCyclicMeasureInput): Promise<CyclicMeasure[]> {
		const cyclicMeasures: CyclicMeasure[] = [];
		const units: Unit[] = await this.prisma.units.findMany({
			where: { surveyId },
		});

		if (!units) {
			for (const unit of units) {
				const unitCode: ObjectTypeUnitCode = await this.prisma.objectTypeUnitCodes.findFirst({
					where: { code: unit.code },
				});

				const defaultMaintenanceMeasures: DefaultMaintenanceMeasure[] =
					await this.defaultMaintenanceMeasureService.getDefaultMaintenanceMeasures(unitCode.id);
				if (!defaultMaintenanceMeasures) {
					for (const defaultMaintenanceMeasure of defaultMaintenanceMeasures) {
						const existingCyclicMeasure: CyclicMeasure = await this.prisma.cyclicMeasures.findFirst({
							where: {
								surveyId,
								unitId: unit.id,
								defaultMaintenanceMeasureId: defaultMaintenanceMeasure.id,
							},
						});
						if (!existingCyclicMeasure) {
							const data: Prisma.cyclicMeasuresCreateInput = {
								...defaultMaintenanceMeasure,
								id: newId(),
								surveys: { connect: { id: surveyId } },
								units: { connect: { id: unit.id } },
								defaultMaintenanceMeasures: { connect: { id: defaultMaintenanceMeasure.id } },
							};
							cyclicMeasures.push(await this.prisma.cyclicMeasures.create({ data }));
						} else {
							const id = existingCyclicMeasure.id;
							const data: Prisma.cyclicMeasuresUpdateInput = {
								...existingCyclicMeasure,
								cycle: defaultMaintenanceMeasure.cycle,
								unitPrice: defaultMaintenanceMeasure.unitPrice,
								quantityUnitOfMeasurement: defaultMaintenanceMeasure.quantityUnitOfMeasurement,
								maintenanceType: defaultMaintenanceMeasure.maintenanceType,
							};
							cyclicMeasures.push(
								await this.prisma.cyclicMeasures.update({
									data,
									where: { id },
								}),
							);
						}
					}
				}
			}
		}
		return cyclicMeasures;
	}

	async updateCyclicMeasure({
		id,
		planYear,
		finalPlanYear,
		costSurcharge,
		remarks,
		cycle,
		unitPrice,
		quantityUnitOfMeasurement,
		maintenanceType,
	}: UpdateCyclicMeasureInput): Promise<CyclicMeasure> {
		const data: Prisma.cyclicMeasuresUpdateInput = {
			planYear,
			finalPlanYear,
			costSurcharge,
			remarks,
			cycle,
			unitPrice,
			quantityUnitOfMeasurement,
			maintenanceType,
		};

		return this.prisma.cyclicMeasures.update({
			where: { id },
			data,
		});
	}

	async deleteCyclicMeasure(identifier: string): Promise<CyclicMeasure> {
		const data: Prisma.cyclicMeasuresUpdateInput = {
			deleted_at: new Date(),
		};

		return this.prisma.cyclicMeasures.update({
			where: { id: identifier },
			data,
		});
	}
}
