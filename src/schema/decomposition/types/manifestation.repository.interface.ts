import { Prisma } from '@prisma/client';

import { CreateManifestationInput } from '../dto/create-manifestation.input';
import { UpdateManifestationInput } from '../dto/update-manifestation.input';

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
		deleted_at: true,
	},
});
export type Manifestation = Prisma.manifestationsGetPayload<typeof manifestations>;

export interface IManifestationRepository {
	createManifestation(input: CreateManifestationInput): Promise<Manifestation>;
	updateManifestation(input: UpdateManifestationInput): Promise<Manifestation>;
	deleteManifestation(identifier: string): Promise<Manifestation>;
}
