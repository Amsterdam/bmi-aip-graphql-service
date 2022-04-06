import { Injectable } from '@nestjs/common';

import type { DecompositionElement } from '../../types';

import { Element } from './models/element.model';


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
const elements: DecompositionElement[] = [
	{
		id: '6d79f740-186d-4197-888e-3384fcb8cb6a',
		surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
		name: 'Kabel',
		code: 113,
	},
	{
		id: '5291eb5d-9078-47e7-bc12-01928a353fe7',
		surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
		name: 'Wegmarkering',
		code: 238,
		location: 'Aan de zuidzijde',
	},
	{
		id: '39d3cc6a-8b2e-4b13-8c16-7347f2c243eb',
		surveyId: 'ac1d31b5-b8ad-48b0-854e-6594585a2d96',
		name: 'Wegmarkering',
		code: 238,
		location: 'Aan de zuidzijde',
	},
];

/**
 * TODO Consider creating a DDD style factory for this. Such a factory would be responsible for creating objects of
 * (i.e.: a Element model instance "object")
 */
const mapElementToModel = ({ id, surveyId, code, name, location }: DecompositionElement) => {
	const element = new Element();
	element.id = id;
	element.surveyId = surveyId;
	element.code = code;
	element.name = name;
	element.location = location;
	return element;
};

@Injectable()
export class ElementsService {
	async getElements(surveyId: string, code?: number): Promise<Element[]> {
		return (
			code
				? elements.filter((e) => e.surveyId === surveyId && e.code === code)
				: elements.filter((e) => e.surveyId === surveyId)
		).map((e) => mapElementToModel(e));
	}

	async getElementById(elementId: string): Promise<Element | undefined> {
		const element = elements.find((e) => e.id === elementId);
		return element ? mapElementToModel(element) : undefined;
	}
}
