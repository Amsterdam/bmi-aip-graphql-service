import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { CreateLuminaireInput } from '../dto/create-luminaire.input';
import { UpdateLuminaireInput } from '../dto/update-luminaire.input';

const luminaires = Prisma.validator<Prisma.spanLuminairesArgs>()({
	select: {
		id: true,
		supportSystemId: true,
		name: true,
		location: true,
		remarks: true,
		constructionYear: true,
		driverCommissioningDate: true,
		driverSupplierType: true,
		lightCommissioningDate: true,
		lightSupplierType: true,
		manufacturer: true,
		supplierType: true,
		// geography: true,
		created_at: true,
		updated_at: true,
		deleted_at: true,
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
}
