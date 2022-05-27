import { domainManifestation } from '../__stubs__/manifestation';

import { Manifestation } from './manifestation.model';

test('Manifestation Domain Model', () => {
	const manifestation = Object.keys(domainManifestation).reduce((model, key) => {
		model[key] = domainManifestation[key];
		return model;
	}, new Manifestation());

	expect(manifestation).toBeInstanceOf(Manifestation);
	expect(manifestation).toEqual(
		expect.objectContaining({
			code: '__CODE__',
			conditionId: null,
			constructionYear: null,
			elementId: 'a13d3055-9447-6178-91d7-386ebbc418f4',
			id: '1f728e79-1b89-4333-a309-ea93bf17667c',
			location: '__LOCATION__',
			material: null,
			name: '__NAME__',
			objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
			observationPointId: null,
			quantity: 3,
			quantityUnitOfMeasurement: 'm2',
			surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
			unitId: '6f1819aa-f5bd-cae5-3ab4-b3bab40f5de2',
		}),
	);
});
