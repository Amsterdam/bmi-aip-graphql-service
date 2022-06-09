import { Injectable } from '@nestjs/common';

import { Element } from './models/element.model';
import { ElementFactory } from './element.factory';
import { Element as DomainElement } from './types/element.repository.interface';

/**
 * This is all temporary bogus code and is just for illustrative purposes. Once Prisma is configured this service
 * should fetch elements from a repository. The repository will return either Prisma model instances or instances of
 * models that are created to represent entities that come from for example the GISIB API. These model instances then
 * need to be mapped to the TS models that have been created for exposure via GraphQL.
 *
 * NOTE: surveyId is likely to get dropped from the Element model; instead an identifier for a specific historic
 * snapshot of the decomposition in GISIB (source of truth) might be stored in AIP against a survey (TBD)
 */

// These elements will come from a repository later
const elements: DomainElement[] = [
	{
		id: '6d79f740-186d-4197-888e-3384fcb8cb6a',
		name: 'Kabel',
		objectId: '0b6b996f-0612-496e-a790-4c11aaba640b',
		surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
		gisibId: 'db1b53ca-4169-41e6-a626-9063859c2621',
		conditionId: null,
		observationPointId: null,
		code: '113',
		location: 'Aan de zuidzijde',
		isArchived: false,
		isElectrical: false,
		isElectricalObjectSpecific: false,
		isStructural: true,
		isStructuralObjectSpecific: false,
		isRelevant: true,
		categoryId: null,
		constructionYear: 2000,
		constructionType: '7',
		elementGroupName: null,
		deleted_at: null,
	},
	{
		id: '5291eb5d-9078-47e7-bc12-01928a353fe7',
		name: 'Wegmarkering',
		objectId: '0b6b996f-0612-496e-a790-4c11aaba640b',
		surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
		gisibId: 'db1b53ca-4169-41e6-a626-9063859c2621',
		conditionId: null,
		observationPointId: null,
		code: '238',
		location: 'Aan de zuidzijde',
		isArchived: false,
		isElectrical: false,
		isElectricalObjectSpecific: false,
		isStructural: true,
		isStructuralObjectSpecific: false,
		isRelevant: true,
		categoryId: null,
		constructionYear: 2000,
		constructionType: '7',
		elementGroupName: null,
		deleted_at: null,
	},
	{
		id: '39d3cc6a-8b2e-4b13-8c16-7347f2c243eb',
		name: 'Wegmarkering',
		objectId: '0b6b996f-0612-496e-a790-4c11aaba640b',
		surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
		gisibId: 'db1b53ca-4169-41e6-a626-9063859c2621',
		conditionId: null,
		observationPointId: null,
		code: '238',
		location: 'Aan de zuidzijde',
		isArchived: false,
		isElectrical: false,
		isElectricalObjectSpecific: false,
		isStructural: true,
		isStructuralObjectSpecific: false,
		isRelevant: true,
		categoryId: null,
		constructionYear: 2000,
		constructionType: '7',
		elementGroupName: null,
		deleted_at: null,
	},
];

@Injectable()
export class ElementService {
	async getElements(surveyId: string, code?: string): Promise<Element[]> {
		return (
			code
				? elements.filter((e) => e.surveyId === surveyId && e.code === code)
				: elements.filter((e) => e.surveyId === surveyId)
		).map((e) => ElementFactory.CreateElement(e));
	}

	async getElementById(elementId: string): Promise<Element | undefined> {
		const element = elements.find((e) => e.id === elementId);
		return element ? ElementFactory.CreateElement(element) : undefined;
	}
}
