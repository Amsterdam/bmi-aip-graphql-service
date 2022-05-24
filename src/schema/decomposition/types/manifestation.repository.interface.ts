import { Prisma } from '@prisma/client';

import { CreateManifestationInput } from '../dto/create-manifestation.input';

const manifestations = Prisma.validator<Prisma.manifestationsArgs>()({
	select: {
		id: true,
		name: true,
		code: true,
		location: true,
		objectId: true,
		surveyId: true,
		elementId: true,
		unitId: true,
		conditionId: true,
		observationPointId: true,
		material: true,
		quantity: true,
		quantityUnitOfMeasurement: true,
		constructionYear: true,
	},
});
export type Manifestation = Prisma.manifestationsGetPayload<typeof manifestations>;

export interface IManifestationRepository {
	createManifestation(input: CreateManifestationInput): Promise<Manifestation>;
}
