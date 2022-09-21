import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { CreateSupportSystemNormalizedInput } from '../dto/create-support-system-normalized.input';
import { UpdateSupportSystemNormalizedInput } from '../dto/update-support-system-normalized.input';

import type { CheckedA11yDetails } from './a11y-details-enum';

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
		created_at: true,
		updated_at: true,
		deleted_at: true,
	},
});

export type SupportSystemWithoutGeography = Prisma.spanSupportSystemsGetPayload<typeof supportSystems>;
export type SupportSystem = SupportSystemWithoutGeography & {
	geography?: Point;
	a11yDetails: CheckedA11yDetails;
};

export interface ISupportSystemRepository {
	getSupportSystems(surveyId: string): Promise<SupportSystem[]>;
	createSupportSystem(input: CreateSupportSystemNormalizedInput): Promise<SupportSystem>;
	updateSupportSystem(input: UpdateSupportSystemNormalizedInput): Promise<SupportSystem>;
	deleteSupportSystem(identifier: string): Promise<SupportSystem>;
}
