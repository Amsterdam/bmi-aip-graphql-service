import { Prisma } from '@prisma/client';

import { CreateElementInput } from '../dto/create-element.input';
import { UpdateElementInput } from '../dto/update-element.input';

const elementProps = {
	id: true,
	permanentId: true,
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
	deleted_at: true,
};

const elements = Prisma.validator<Prisma.elementsArgs>()({
	select: { ...elementProps },
});
const elementWithUnits = Prisma.validator<Prisma.elementsArgs>()({
	select: { ...elementProps, units: true },
});
export type Element = Prisma.elementsGetPayload<typeof elements>;
export type ElementWithUnits = Prisma.elementsGetPayload<typeof elementWithUnits>;

export interface IElementRepository {
	createElement(input: CreateElementInput): Promise<Element>;
	updateElement(input: UpdateElementInput): Promise<Element>;
	deleteElement(identifier: string): Promise<Element>;
}
