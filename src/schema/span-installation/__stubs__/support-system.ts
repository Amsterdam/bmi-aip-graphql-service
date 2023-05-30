import { Decimal } from '@prisma/client/runtime';

import { SupportSystem } from '../models/support-system.model';
import { CreateSupportSystemInput } from '../dto/create-support-system.input';
import { SupportSystem as DomainSupportSystem } from '../types/support-system.repository.interface';
import { SupportSystemFactory } from '../support-system.factory';
import { UpdateSupportSystemInput } from '../dto/update-support-system.input';
import { SupportSystemType, SupportSystemTypeDetailedFacade } from '../types';
import { normalizeSupportSystemInputUtil } from '../utils/normalize-support-system-input.util';
import { CreateSupportSystemNormalizedInput } from '../dto/create-support-system-normalized.input';
import { UpdateSupportSystemNormalizedInput } from '../dto/update-support-system-normalized.input';
import { A11yDetails } from '../models/a11y-details.model';
import { CreateMissingSupportSystemNormalizedInput } from '../dto/create-missing-support-system-normalized.input';
import { ReviseSupportSystemInput } from '../dto/revise-support-system.input';
import { ReviseSupportSystemNormalizedInput } from '../dto/revise-support-system-normalized.input';
import { CreateMissingSupportSystemInput } from '../dto/create-missing-support-system.input';

const supportSystem1 = new SupportSystem();
supportSystem1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
supportSystem1.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
supportSystem1.location = 'Aan de zuidzijde';
supportSystem1.name = 'Support System 1';
supportSystem1.geography = {
	type: 'Point',
	coordinates: [52.370302853062604, 4.893996915500548],
};
supportSystem1.geographyRD = {
	coordinates: [116211.88, 487352.77],
	type: 'Point',
};

const reviseSupportSystem1 = { remarksRevision: '__REMARKS_REVISION__', ...supportSystem1 };

const supportSystem2 = new SupportSystem();
supportSystem2.id = '6d79f740-186d-4197-888e-3384fcb8cb6a';
supportSystem2.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
supportSystem2.name = 'Support System 2';
supportSystem2.geography = {
	type: 'Point',
	coordinates: [52.370302853062604, 4.893996915500548],
};
supportSystem2.geographyRD = {
	coordinates: [116211.88, 487352.77],
	type: 'Point',
};

export { supportSystem1, supportSystem2, reviseSupportSystem1 };

const a11yDetails = new A11yDetails();
a11yDetails.limitationOnTheMaximumHeadroom = true;

const supportSystemRaw: Omit<DomainSupportSystem, 'id' | 'permanentId'> = {
	name: '__NAME__',
	location: '__LOCATION__',
	objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
	surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
	remarks: '__REMARKS__',
	constructionYear: 1979,
	houseNumber: '33',
	type: SupportSystemType.Facade,
	typeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
	locationIndication: '__LOCATION_INDICATION__',
	a11yDetails: JSON.parse(JSON.stringify(a11yDetails)),
	installationHeight: new Decimal(10),
	installationLength: new Decimal(10),
	deleted_at: null,
	created_at: undefined,
	updated_at: undefined,
	geography: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	geographyRD: {
		coordinates: [116211.88, 487352.77],
		type: 'Point',
	},
	remarksRevision: null,
};

const reviseSupportSystemRaw = { ...supportSystemRaw };
reviseSupportSystemRaw.remarksRevision = '__REMARKS_REVISION__';

export const createSupportSystemInput = Object.keys(supportSystemRaw).reduce((input, key) => {
	if (key === 'typeDetailed') {
		input.typeDetailedFacade = supportSystemRaw[key] as SupportSystemTypeDetailedFacade;
		return input;
	}
	if (key === 'a11yDetails') {
		input.a11yDetails = a11yDetails;
		return input;
	}
	input[key] = supportSystemRaw[key];
	return input;
}, new CreateSupportSystemInput());

export const createMissingSupportSystemInput = Object.keys(reviseSupportSystemRaw).reduce((input, key) => {
	if (key === 'typeDetailed') {
		input.typeDetailedFacade = reviseSupportSystemRaw[key] as SupportSystemTypeDetailedFacade;
		return input;
	}
	if (key === 'a11yDetails') {
		input.a11yDetails = a11yDetails;
		return input;
	}
	if (key === 'remarksRevision') {
		input.remarksRevision = '__REMARKS_REVISION__';
		return input;
	}
	input[key] = reviseSupportSystemRaw[key];
	return input;
}, new CreateMissingSupportSystemInput());

const updateSupportSystem = new UpdateSupportSystemInput();
updateSupportSystem.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
const reviseSupportSystem = new ReviseSupportSystemInput();
reviseSupportSystem.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
reviseSupportSystem.remarksRevision = '__REMARKS_REVISION__';

export const updateSupportSystemInput = Object.keys(supportSystemRaw).reduce((input, key) => {
	if (key === 'typeDetailed') {
		input.typeDetailedFacade = supportSystemRaw[key] as SupportSystemTypeDetailedFacade;
		return input;
	}
	if (key === 'a11yDetails') {
		input.a11yDetails = a11yDetails;
		return input;
	}
	input[key] = supportSystemRaw[key];
	return input;
}, updateSupportSystem);

export const reviseSupportSystemInput = Object.keys(reviseSupportSystemRaw).reduce((input, key) => {
	if (key === 'typeDetailed') {
		input.typeDetailedFacade = reviseSupportSystemRaw[key] as SupportSystemTypeDetailedFacade;
		return input;
	}
	if (key === 'a11yDetails') {
		input.a11yDetails = a11yDetails;
		return input;
	}
	if (key === 'remarksRevision') {
		input.remarksRevision = '__REMARKS_REVISION__';
		return input;
	}
	input[key] = reviseSupportSystemRaw[key];
	return input;
}, reviseSupportSystem);

export const createSupportSystemNormalizedInput = normalizeSupportSystemInputUtil(
	createSupportSystemInput,
	new CreateSupportSystemNormalizedInput(),
);

export const createMissingSupportSystemNormalizedInput = normalizeSupportSystemInputUtil(
	createMissingSupportSystemInput,
	new CreateMissingSupportSystemNormalizedInput(),
);

export const updateSupportSystemNormalizedInput = normalizeSupportSystemInputUtil(
	updateSupportSystem,
	new UpdateSupportSystemNormalizedInput(),
);

export const reviseSupportSystemNormalizedInput = normalizeSupportSystemInputUtil(
	reviseSupportSystem,
	new ReviseSupportSystemNormalizedInput(),
);

export const domainSupportSystem: DomainSupportSystem = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	permanentId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...supportSystemRaw,
	deleted_at: null,
};

export const domainReviseSupportSystem: DomainSupportSystem = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	permanentId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...reviseSupportSystemRaw,
	deleted_at: null,
};

export const supportSystem = SupportSystemFactory.CreateSupportSystem(domainSupportSystem);

export const deletedSupportSystem: DomainSupportSystem = {
	...domainSupportSystem,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
