import { CreateCyclicMeasureInput } from './dto/create-cyclic-measure.input';
import { CyclicMeasureFactory } from './cyclic-measure.factory';
import { domainCyclicMeasure } from './__stubs__';
import { CyclicMeasure } from './models/cyclic-measure.model';

describe('CyclicMeasureFactory', () => {
	test('CreateCyclicMeasure() constructs an instance of an CyclicMeasure GraphQL model', () => {
		const result = CyclicMeasureFactory.CreateCyclicMeasure(domainCyclicMeasure);
		const object = {
			...domainCyclicMeasure,
			deletedAt: domainCyclicMeasure.deleted_at,
		};
		delete object.created_at;
		delete object.updated_at;
		delete object.deleted_at;

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(CyclicMeasure);
	});

	test('CreateCyclicMeasureInput', () => {
		const result = CyclicMeasureFactory.CreateCyclicMeasureInput('__UNIT_ID__');
		expect(result).toEqual({
			unitId: '__UNIT_ID__',
		});
		expect(result).toBeInstanceOf(CreateCyclicMeasureInput);
	});
});
