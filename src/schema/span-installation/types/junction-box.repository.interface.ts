import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { CreateJunctionBoxInput } from '../dto/create-junction-box.input';
import { UpdateJunctionBoxInput } from '../dto/update-junction-box.input';

const junctionBoxes = Prisma.validator<Prisma.spanJunctionBoxesArgs>()({
	select: {
		id: true,
		objectId: true,
		surveyId: true,
		name: true,
		mastNumber: true,
		location: true,
		locationIndication: true,
		a11yDetails: true,
		installationHeight: true,
		riserTubeVisible: true,
		remarks: true,
		created_at: true,
		updated_at: true,
		deleted_at: true,
		geographyRD: true,
		permanentId: true,
		spanDecompositionData: true,
	},
});

export type JunctionBoxWithoutGeography = Prisma.spanJunctionBoxesGetPayload<typeof junctionBoxes>;
export type JunctionBox = JunctionBoxWithoutGeography & {
	geography?: Point;
};

export interface IJunctionBoxRepository {
	getJunctionBoxes(surveyId: string): Promise<JunctionBox[]>;
	createJunctionBox(input: CreateJunctionBoxInput): Promise<JunctionBox>;
	updateJunctionBox(input: UpdateJunctionBoxInput): Promise<JunctionBox>;
	deleteJunctionBox(identifier: string): Promise<JunctionBox>;
	cloneJunctionBoxes(objectId: string, surveyId: string): Promise<JunctionBox[]>;
}
