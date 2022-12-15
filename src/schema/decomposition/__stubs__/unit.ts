import { CreateUnitInput } from '../dto/create-unit.input';
import { Unit as DomainUnit } from '../types/unit.repository.interface';
import { UnitFactory } from '../unit.factory';
import { Unit } from '../models/unit.model';
import { UpdateUnitInput } from '../dto/update-unit.input';

const unit1 = new Unit();
unit1.id = '7fc02001-838b-40a9-967a-036ea5391eff';
unit1.elementId = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
unit1.code = '238';
unit1.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
unit1.location = 'Aan de zuidzijde';
unit1.name = '__UNIT_1__';

const unit2 = new Unit();
unit2.id = 'fdda825d-386f-441a-aa09-fcd801f0bca5';
unit2.elementId = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
unit2.code = '113';
unit2.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
unit2.name = '__UNIT_2__';

export { unit1, unit2 };

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
	deleted_at: null,
};

export const unitInput = Object.keys(unitRaw).reduce((input, key) => {
	input[key] = unitRaw[key];
	return input;
}, new CreateUnitInput());

const fixedGuid = '1f728e79-1b89-4333-a309-ea93bf17667c';

export const domainUnit: DomainUnit = {
	id: fixedGuid,
	...unitRaw,
	permanentId: fixedGuid,
	gisibId: null,
	conditionId: null,
	constructionYear: null,
	observationPointId: null,
};

const updateUnit = new UpdateUnitInput();
updateUnit.id = fixedGuid;
export const updateUnitInput = Object.keys(unitRaw)
	.filter((key) => !['objectId', 'surveyId', 'elementId'].includes(key))
	.reduce((input, key) => {
		input[key] = unitRaw[key];
		return input;
	}, updateUnit);

export const unit = UnitFactory.CreateUnit(domainUnit);

export const deletedUnit: DomainUnit = {
	...domainUnit,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
