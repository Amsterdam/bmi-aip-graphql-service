import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { CreateSupportSystemInput } from '../dto/create-support-system.input';
import { UpdateSupportSystemInput } from '../dto/update-support-system.input';

const supportSystems = Prisma.validator<Prisma.spanSupportSystemsArgs>()({
	select: {
		id: true,
		objectId: true,
		surveyId: true,
		name: true,
		location: true,
		locationIndication: true,
		a11yDetails: true,
		installationHeight: true,
		remarks: true,
		constructionYear: true,
		houseNumber: true,
		type: true,
		typeDetailed: true,
		// geography: true,
		created_at: true,
		updated_at: true,
		deleted_at: true,
	},
});

export type SupportSystemWithoutGeography = Prisma.spanSupportSystemsGetPayload<typeof supportSystems>;
export type SupportSystem = SupportSystemWithoutGeography & {
	geography?: Point;
};

export interface ISupportSystemRepository {
	getSupportSystems(surveyId: string): Promise<SupportSystem[]>;
	createSupportSystem(input: CreateSupportSystemInput): Promise<SupportSystem>;
	updateSupportSystem(input: UpdateSupportSystemInput): Promise<SupportSystem>;
	deleteSupportSystem(identifier: string): Promise<SupportSystem>;
}
