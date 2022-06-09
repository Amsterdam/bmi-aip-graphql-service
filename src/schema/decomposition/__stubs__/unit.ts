import { CreateUnitInput } from '../dto/create-unit.input';
import { Unit as DomainUnit } from '../types/unit.repository.interface';
import { UnitFactory } from '../unit.factory';
import { UpdateUnitInput } from '../dto/update-unit.input';

const unitRaw = {
	code: '__CODE__',
	name: '__NAME__',
	location: '__LOCATION__',
	objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
	surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
	elementId: 'a13d3055-9447-6178-91d7-386ebbc418f4',
	quantity: 3,
	quantityUnitOfMeasurement: 'm2',
	constructionYear: 2010,
	material: '__MATERIAL__',
	isRelevant: true,
	isStructural: true,
	isElectrical: false,
	isStructuralObjectSpecific: false,
	isElectricalObjectSpecific: false,
};

export const unitInput = Object.keys(unitRaw).reduce((input, key) => {
	input[key] = unitRaw[key];
	return input;
}, new CreateUnitInput());

export const domainUnit: DomainUnit = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...unitRaw,
	gisibId: null,
	conditionId: null,
	constructionYear: null,
	observationPointId: null,
};

const updateUnit = new UpdateUnitInput();
updateUnit.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateUnitInput = Object.keys(unitRaw).reduce((input, key) => {
	input[key] = unitRaw[key];
	return input;
}, updateUnit);

export const unit = UnitFactory.CreateUnit(domainUnit);
