import { Element } from './element.model';

describe('Decomposition / Model / Element', () => {
	test('constructs an Element instance object', () => {
		const element = new Element();
		element.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		element.code = '113';
		element.objectId = '55bf8e88-6510-41f1-af52-e4f8c10573b9';
		element.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
		element.gisibId = '95af080a-5a72-4fbe-862a-e5c56088f137';
		element.location = 'Aan de zuidzijde';
		element.name = 'Wegmarkering';
		element.categoryId = 'c80f93ca-45e4-4147-bbab-28c16efc8168';
		element.isStructural = false;
		element.constructionYear = 2000;
		element.constructionType = '7';
		element.elementGroupName = 'substructure';
		element.isArchived = false;
		element.isElectrical = true;
		element.isStructural = true;
		element.isStructuralObjectSpecific = false;
		element.isElectricalObjectSpecific = false;
		element.isRelevant = true;
		element.conditionId = 'e3d3e5b6-890f-4cab-b68e-d46f30582114';
		element.observationPointId = '66d3b749-caf9-4d38-bd89-b9bf9aa640f6';

		expect(element).toBeInstanceOf(Element);
		expect(element).toEqual({
			categoryId: 'c80f93ca-45e4-4147-bbab-28c16efc8168',
			code: '113',
			constructionType: '7',
			constructionYear: 2000,
			elementGroupName: 'substructure',
			gisibId: '95af080a-5a72-4fbe-862a-e5c56088f137',
			id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			isArchived: false,
			isElectrical: true,
			isElectricalObjectSpecific: false,
			isRelevant: true,
			isStructural: true,
			isStructuralObjectSpecific: false,
			location: 'Aan de zuidzijde',
			name: 'Wegmarkering',
			objectId: '55bf8e88-6510-41f1-af52-e4f8c10573b9',
			surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			conditionId: 'e3d3e5b6-890f-4cab-b68e-d46f30582114',
			observationPointId: '66d3b749-caf9-4d38-bd89-b9bf9aa640f6',
		});
	});
});
