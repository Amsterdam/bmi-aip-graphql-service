import { CreateMeasureInput } from './dto/create-measure.input';
import { MeasureFactory } from './measure.factory';
import { domainMeasure } from './__stubs__';
import { Measure } from './models/measure.model';

describe('MeasureFactory', () => {
	test('CreateMeasure() constructs an instance of an Measure GraphQL model', () => {
		const result = MeasureFactory.CreateMeasure(domainMeasure);
		const object = { ...domainMeasure, deletedAt: domainMeasure.deleted_at };
		delete object.deleted_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(Measure);
	});

	test('CreateMeasureInput', () => {
		const result = MeasureFactory.CreateMeasureInput('__UNIT_ID__');
		expect(result).toEqual({
			unitId: '__UNIT_ID__',
		});
		expect(result).toBeInstanceOf(CreateMeasureInput);
	});
});
