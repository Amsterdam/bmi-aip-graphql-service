import { Decimal } from '@prisma/client/runtime';

import { Condition } from '../models/condition.model';
import { CreateConditionInput } from '../dto/create-condition.input';
import { Condition as DomainCondition } from '../types/condition.repository.interface';
import { ConditionFactory } from '../condition.factory';
import { UpdateConditionInput } from '../dto/update-condition.input';

const condition1 = new Condition();
condition1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
condition1.surveyId = '68a95a2c-b909-e77f-4d66-9fd5afef5adb';
condition1.unitId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
condition1.costYear = 2010;
condition1.score = '7.3';
condition1.careScore = '33.99';
condition1.advice = '__ADVICE__';

const condition2 = new Condition();
condition2.id = '6d79f740-186d-4197-888e-3384fcb8cb6a';
condition2.surveyId = '68a95a2c-b909-e77f-4d66-9fd5afef5adb';
condition2.unitId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
condition2.costYear = 2010;
condition2.score = '7.3';
condition2.careScore = '33.99';
condition2.advice = '__ADVICE__';

export { condition1, condition2 };

const conditionRaw: Omit<DomainCondition, 'id'> = {
	surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5adb',
	elementId: '',
	unitId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
	manifestationId: '',
	advice: '__ADVICE__',
	cost: 0,
	costYear: 2010,
	created_at: undefined,
	updated_at: undefined,
	score: '7.3',
	careScore: '33.99',
	investigationPriority: '',
	craInspectionRemarks: '',
	craInitialScore: 0,
	craHistoryScore: 0,
	craInspectionScore: 0,
	craInitialRemarks: '',
	craHistoryRemarks: '',
	craInitialUnityCheck: new Decimal(10.2),
	craHistoryUnityCheck: new Decimal(10.2),
	ramsMaxTotalPriority: '',
	ramsMaxWeightedPriority: '',
	isFurtherInvestigation: false,
};

export const conditionInput = Object.keys(conditionRaw).reduce((input, key) => {
	input[key] = conditionRaw[key];
	return input;
}, new CreateConditionInput());

const updateCondition = new UpdateConditionInput();
updateCondition.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateConditionInput = Object.keys(conditionRaw).reduce((input, key) => {
	input[key] = conditionRaw[key];
	return input;
}, updateCondition);

export const domainCondition: DomainCondition = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...conditionRaw,
};

export const condition = ConditionFactory.CreateCondition(domainCondition);
