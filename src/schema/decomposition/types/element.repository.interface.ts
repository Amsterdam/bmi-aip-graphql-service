import { Prisma } from '@prisma/client';

import { CreateElementInput } from '../dto/create-element.input';

const elements = Prisma.validator<Prisma.elementsArgs>()({
	select: {
		id: true,
		name: true,
		objectId: true,
		surveyId: true,
		gisibId: true,
		code: true,
		location: true,
		categoryId: true,
		conditionId: true,
		observationPointId: true,
		constructionYear: true,
		constructionType: true,
		elementGroupName: true,
		isArchived: true,
		isStructural: true,
		isElectrical: true,
		isStructuralObjectSpecific: true,
		isElectricalObjectSpecific: true,
		isRelevant: true,
	},
});
export type Element = Prisma.elementsGetPayload<typeof elements>;

export interface IElementRepository {
	createElement(input: CreateElementInput): Promise<Element>;
}
