import { Decimal } from '@prisma/client/runtime';

import { SupportSystem } from '../models/support-system.model';
import { CreateSupportSystemInput } from '../dto/create-support-system.input';
import { SupportSystem as DomainSupportSystem } from '../types/support-system.repository.interface';
import { SupportSystemFactory } from '../support-system.factory';
import { UpdateSupportSystemInput } from '../dto/update-support-system.input';
import { SupportSystemType } from '../../../types';

const supportSystem1 = new SupportSystem();
supportSystem1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
supportSystem1.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
supportSystem1.location = 'Aan de zuidzijde';
supportSystem1.name = 'Support System 1';
supportSystem1.geography = {
	type: 'Point',
	coordinates: [52.370302853062604, 4.893996915500548],
};

const supportSystem2 = new SupportSystem();
supportSystem2.id = '6d79f740-186d-4197-888e-3384fcb8cb6a';
supportSystem2.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
supportSystem2.name = 'Support System 2';
supportSystem2.geography = {
	type: 'Point',
	coordinates: [52.370302853062604, 4.893996915500548],
};

export { supportSystem1, supportSystem2 };

const supportSystemRaw: Omit<DomainSupportSystem, 'id'> = {
	name: '__NAME__',
	location: '__LOCATION__',
	objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
	surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
	remarks: '__REMARKS__',
	constructionYear: 1979,
	houseNumber: '33',
	type: SupportSystemType.facade,
	typeDetailed: 'two',
	locationIndication: '__LOCATION_INDICATION__',
	a11yDetails: '__A11Y_DETAILS__',
	installationHeight: new Decimal(10.9),
	deleted_at: null,
	created_at: undefined,
	updated_at: undefined,
	geography: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
};

export const supportSystemInput = Object.keys(supportSystemRaw).reduce((input, key) => {
	input[key] = supportSystemRaw[key];
	return input;
}, new CreateSupportSystemInput());

const updateSupportSystem = new UpdateSupportSystemInput();
updateSupportSystem.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateSupportSystemInput = Object.keys(supportSystemRaw).reduce((input, key) => {
	input[key] = supportSystemRaw[key];
	return input;
}, updateSupportSystem);

export const domainSupportSystem: DomainSupportSystem = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...supportSystemRaw,
	deleted_at: null,
};

export const supportSystem = SupportSystemFactory.CreateSupportSystem(domainSupportSystem);

export const deletedSupportSystem: DomainSupportSystem = {
	...domainSupportSystem,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
