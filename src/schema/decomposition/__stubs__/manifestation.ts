import { CreateManifestationInput } from '../dto/create-manifestation.input';
import { Manifestation as DomainManifestation } from '../types/manifestation.repository.interface';
import { ManifestationFactory } from '../manifestation.factory';
import { UpdateUnitInput } from '../dto/update-unit.input';

const manifestationRaw = {
	code: '__CODE__',
	name: '__NAME__',
	location: '__LOCATION__',
	objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
	surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
	elementId: 'a13d3055-9447-6178-91d7-386ebbc418f4',
	unitId: '6f1819aa-f5bd-cae5-3ab4-b3bab40f5de2',
	quantity: 3,
	quantityUnitOfMeasurement: 'm2',
	deleted_at: null,
};

export const manifestationInput = Object.keys(manifestationRaw).reduce((input, key) => {
	input[key] = manifestationRaw[key];
	return input;
}, new CreateManifestationInput());

export const domainManifestation: DomainManifestation = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...manifestationRaw,
	material: null,
	conditionId: null,
	constructionYear: null,
	observationPointId: null,
};

const updateManifestation = new UpdateUnitInput();
updateManifestation.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateManifestationInput = Object.keys(manifestationRaw)
	.filter((key) => !['objectId', 'surveyId', 'unitId'].includes(key))
	.reduce((input, key) => {
		input[key] = manifestationRaw[key];
		return input;
	}, updateManifestation);

export const manifestation = ManifestationFactory.CreateManifestation(domainManifestation);

export const deletedManifestation: DomainManifestation = {
	...domainManifestation,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
