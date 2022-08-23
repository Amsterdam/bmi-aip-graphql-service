import { Prisma } from '@prisma/client';

import { CreateObjectInput } from '../dto/create-object.input';

const objects = Prisma.validator<Prisma.objectsArgs>()({
	select: {
		id: true,
		name: true,
		code: true,
		location: true,
		// latitude: true,
		// longitude: true,
		updatedOn: true,
		compositionIsVisible: true,
		clientCompanyId: true,
		operatorCompanyId: true,
		surveyorCompanyId: true,
		objectTypeId: true,
		created_at: true,
		updated_at: true,
		inspectionStandardId: true,
		ownerCompanyId: true,
		customerVersion: true,
		isPublic: true,
		isDemo: true,
		siteId: true,
		constructionYear: true,
		externalRefId: true,
		useage: true,
		managementOrganization: true,
		// shape: true,
		shapeSrid: true,
		status: true,
		effortCategory: true,
		effortCalculation: true,
		trafficType: true,
		mainMaterial: true,
		marineInfrastrutureType: true,
		// length: true,
		// width: true,
		// squareMeters: true,
		attributes: true,
	},
});
export type DbObject = Prisma.objectsGetPayload<typeof objects>;

export interface IObjectRepository {
	createObject(input: CreateObjectInput): Promise<DbObject>;
}
