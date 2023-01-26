import { CreateConditionInput } from './dto/create-condition.input';
import { ConditionFactory } from './condition.factory';
import { domainCondition } from './__stubs__';
import { Condition } from './models/condition.model';

describe('ConditionFactory', () => {
	test('CreateCondition() constructs an instance of an Condition GraphQL model', () => {
		const result = ConditionFactory.CreateCondition(domainCondition);
		const object = {
			...domainCondition,
			createdAt: domainCondition.created_at ?? null,
			updatedAt: domainCondition.updated_at ?? null,
			craHistoryUnityCheck: 10.2,
			craInitialUnityCheck: 10.2,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(Condition);
	});

	test('CreateConditionInput', () => {
		const result = ConditionFactory.CreateConditionInput('__UNIT_ID__');
		expect(result).toEqual({
			unitId: '__UNIT_ID__',
		});
		expect(result).toBeInstanceOf(CreateConditionInput);
	});
});
