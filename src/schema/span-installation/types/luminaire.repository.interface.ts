import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { CreateLuminaireInput } from '../dto/create-luminaire.input';
import { CreateReviseLuminaireInput } from '../dto/create-revise-luminaire.input';
import { UpdateLuminaireInput } from '../dto/update-luminaire.input';
import { UpdateReviseLuminaireInput } from '../dto/update-revise-luminaire.input';

const luminaires = Prisma.validator<Prisma.spanLuminairesArgs>()({
	select: {
		id: true,
		supportSystemId: true,
		name: true,
		location: true,
		hasLED: true,
		remarks: true,
		constructionYear: true,
		driverCommissioningDate: true,
		driverSupplierType: true,
		lightCommissioningDate: true,
		lightSupplierType: true,
		manufacturer: true,
		supplierType: true,
		created_at: true,
		updated_at: true,
		deleted_at: true,
		geographyRD: true,
		permanentId: true,
		remarksRevision: true,
	},
});

export type LuminaireWithoutGeography = Prisma.spanLuminairesGetPayload<typeof luminaires>;
export type Luminaire = LuminaireWithoutGeography & {
	geography?: Point;
};

export interface ILuminaireRepository {
	getLuminaires(surveyId: string): Promise<Luminaire[]>;
	createLuminaire(input: CreateLuminaireInput): Promise<Luminaire>;
	updateLuminaire(input: UpdateLuminaireInput): Promise<Luminaire>;
	deleteLuminaire(identifier: string): Promise<Luminaire>;
	createReviseLuminaire(input: CreateReviseLuminaireInput): Promise<Luminaire>;
	updateReviseLuminaire(input: UpdateReviseLuminaireInput): Promise<Luminaire>;
}
