import { gisibUnit1 } from '../../gisib/__stubs__/gisibUnit';

import { UnitFactory } from './unit.factory';
import { domainUnit } from './__stubs__';
import { Unit } from './models/unit.model';
import { CreateUnitInput } from './dto/create-unit.input';

describe('UnitFactory', () => {
	test('CreateUnit() constructs an instance of a Unit GraphQL model', () => {
		const result = UnitFactory.CreateUnit(domainUnit);
		expect(result).toEqual(expect.objectContaining(domainUnit));
		expect(result).toBeInstanceOf(Unit);
	});

	test('CreateUnit() constructs an instance of CreateUnitInput', () => {
		const result = UnitFactory.CreateUnitInput('__OBJECT_ID__', '__SURVEY_ID__', '__ELEMENT_ID__', gisibUnit1);
		expect(result).toBeInstanceOf(CreateUnitInput);
		expect(result).toEqual({
			code: 'BRU0231-147-1328',
			elementId: '__ELEMENT_ID__',
			gisibId: 661837,
			name: 'Langsligger',
			objectId: '__OBJECT_ID__',
			surveyId: '__SURVEY_ID__',
		});
	});
});
