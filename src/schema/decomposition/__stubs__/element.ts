import { Element } from '../models/element.model';
import { CreateElementInput } from '../dto/create-element.input';
import { Element as DomainElement } from '../types/element.repository.interface';
import { ElementFactory } from '../element.factory';
import { UpdateElementInput } from '../dto/update-element.input';

const element1 = new Element();
element1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
element1.code = '238';
element1.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
element1.location = 'Aan de zuidzijde';
element1.name = 'Wegmarkering';

const element2 = new Element();
element2.id = '6d79f740-186d-4197-888e-3384fcb8cb6a';
element2.code = '113';
element2.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
element2.name = 'Kabel';

export { element1, element2 };

const elementRaw: Omit<DomainElement, 'id'> = {
	code: '__CODE__',
	name: '__NAME__',
	location: '__LOCATION__',
	objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
	surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
	categoryId: 'a13d3055-9447-6178-91d7-386ebbc418f4',
	constructionYear: 2010,
	isRelevant: true,
	isStructural: true,
	isElectrical: false,
	isStructuralObjectSpecific: false,
	isElectricalObjectSpecific: false,
	conditionId: null,
	observationPointId: null,
	constructionType: '',
	elementGroupName: '',
	isArchived: false,
	gisibId: null,
	deleted_at: null,
};

export const elementInput = Object.keys(elementRaw).reduce((input, key) => {
	input[key] = elementRaw[key];
	return input;
}, new CreateElementInput());

const updateElement = new UpdateElementInput();
updateElement.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateElementInput = Object.keys(elementRaw).reduce((input, key) => {
	input[key] = elementRaw[key];
	return input;
}, updateElement);

export const domainElement: DomainElement = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...elementRaw,
	gisibId: null,
	conditionId: null,
	constructionYear: null,
	observationPointId: null,
	deleted_at: null,
};

export const element = ElementFactory.CreateElement(domainElement);

export const deletedElement: DomainElement = {
	...domainElement,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
