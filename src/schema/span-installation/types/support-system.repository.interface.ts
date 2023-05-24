import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { CreateSupportSystemNormalizedInput } from '../dto/create-support-system-normalized.input';
import { UpdateSupportSystemNormalizedInput } from '../dto/update-support-system-normalized.input';

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
		installationLength: true,
		remarks: true,
		constructionYear: true,
		houseNumber: true,
		type: true,
		typeDetailed: true,
		created_at: true,
		updated_at: true,
		deleted_at: true,
		geographyRD: true,
		permanentId: true,
		remarksRevision: true,
	},
});

export type SupportSystemWithoutGeography = Prisma.spanSupportSystemsGetPayload<typeof supportSystems>;
export type SupportSystem = SupportSystemWithoutGeography & {
	geography?: Point;
};

export interface ISupportSystemRepository {
	getSupportSystems(surveyId: string): Promise<SupportSystem[]>;
	createSupportSystem(input: CreateSupportSystemNormalizedInput): Promise<SupportSystem>;
	updateSupportSystem(input: UpdateSupportSystemNormalizedInput): Promise<SupportSystem>;
	deleteSupportSystem(identifier: string): Promise<SupportSystem>;
	cloneSupportSystems(objectId: string, surveyId: string): Promise<SupportSystem[]>;
}
