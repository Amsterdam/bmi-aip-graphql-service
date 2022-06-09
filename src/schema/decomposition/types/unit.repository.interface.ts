import { Prisma } from '@prisma/client';

import { CreateUnitInput } from '../dto/create-unit.input';
import { UpdateUnitInput } from '../dto/update-unit.input';

const units = Prisma.validator<Prisma.unitsArgs>()({
	select: {
		id: true,
		name: true,
		code: true,
		location: true,
		objectId: true,
		surveyId: true,
		elementId: true,
		gisibId: true,
		conditionId: true,
		observationPointId: true,
		material: true,
		quantity: true,
		quantityUnitOfMeasurement: true,
		constructionYear: true,
		isStructural: true,
		isElectrical: true,
		isStructuralObjectSpecific: true,
		isElectricalObjectSpecific: true,
		isRelevant: true,
	},
});
export type Unit = Prisma.unitsGetPayload<typeof units>;

export interface IUnitRepository {
	createUnit(input: CreateUnitInput): Promise<Unit>;
	updateUnit(input: UpdateUnitInput): Promise<Unit>;
}
