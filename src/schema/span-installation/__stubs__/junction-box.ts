import { Prisma } from '@prisma/client';

import { JunctionBox } from '../models/junction-box.model';
import { CreateJunctionBoxInput } from '../dto/create-junction-box.input';
import { JunctionBox as DomainJunctionBox } from '../types/junction-box.repository.interface';
import { JunctionBoxFactory } from '../junction-box.factory';
import { UpdateJunctionBoxInput } from '../dto/update-junction-box.input';
import { A11yDetails } from '../models/a11y-details.model';
import { CreateMissingJunctionBoxInput } from '../dto/create-missing-junction-box.input';
import { ReviseJunctionBoxInput } from '../dto/revise-junction-box.input';

const junctionBox1 = new JunctionBox();
junctionBox1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
junctionBox1.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
junctionBox1.location = 'Aan de zuidzijde';
junctionBox1.name = 'Junction Box 1';
junctionBox1.geography = {
	type: 'Point',
	coordinates: [52.370302853062604, 4.893996915500548],
};
junctionBox1.geographyRD = {
	coordinates: [116211.88, 487352.77],
	type: 'Point',
};

const reviseJunctionBox1 = junctionBox1;
reviseJunctionBox1.remarksRevision = '__REMARKS_REVISION__';

const junctionBox2 = new JunctionBox();
junctionBox2.id = '6d79f740-186d-4197-888e-3384fcb8cb6a';
junctionBox2.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
junctionBox2.name = 'Junction Box 2';
junctionBox2.geography = {
	type: 'Point',
	coordinates: [52.370302853062604, 4.893996915500548],
};
junctionBox2.geographyRD = {
	coordinates: [116211.88, 487352.77],
	type: 'Point',
};

export { junctionBox1, junctionBox2, reviseJunctionBox1 };

const a11yDetails = new A11yDetails();
a11yDetails.limitationOnTheMaximumHeadroom = true;

const junctionBoxRaw: Omit<DomainJunctionBox, 'id' | 'permanentId' | 'techViewId' | 'mastId'> = {
	name: '__NAME__',
	location: '__LOCATION__',
	objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
	surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
	remarks: '__REMARKS__',
	mastNumber: new Prisma.Decimal(33.33),
	locationIndication: '__LOCATION_INDICATION__',
	a11yDetails: JSON.parse(JSON.stringify(a11yDetails)),
	installationHeight: new Prisma.Decimal(10),
	riserTubeVisible: true,
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

const reviseJunctionBoxRaw = { ...junctionBoxRaw };
reviseJunctionBoxRaw.remarksRevision = '__REMARKS_REVISION__';

export const junctionBoxInput = Object.keys(junctionBoxRaw).reduce((input, key) => {
	if (key === 'a11yDetails') {
		input.a11yDetails = a11yDetails;
		return input;
	}
	input[key] = junctionBoxRaw[key];
	return input;
}, new CreateJunctionBoxInput());

export const createMissingJunctionBoxInput = Object.keys(reviseJunctionBoxRaw).reduce((input, key) => {
	if (key === 'a11yDetails') {
		input.a11yDetails = a11yDetails;
		return input;
	}
	if (key === 'remarksRevision') {
		input.remarksRevision = '__REMARKS_REVISION__';
		return input;
	}
	input[key] = reviseJunctionBoxRaw[key];
	return input;
}, new CreateMissingJunctionBoxInput());

const updateJunctionBox = new UpdateJunctionBoxInput();
updateJunctionBox.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateJunctionBoxInput = Object.keys(junctionBoxRaw).reduce((input, key) => {
	if (key === 'a11yDetails') {
		input.a11yDetails = a11yDetails;
		return input;
	}
	input[key] = junctionBoxRaw[key];
	return input;
}, updateJunctionBox);

const reviseJunctionBox = new ReviseJunctionBoxInput();
reviseJunctionBox.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const reviseJunctionBoxInput = Object.keys(reviseJunctionBoxRaw).reduce((input, key) => {
	if (key === 'a11yDetails') {
		input.a11yDetails = a11yDetails;
		return input;
	}
	if (key === 'remarksRevision') {
		input.remarksRevision = '__REMARKS_REVISION__';
		return input;
	}
	input[key] = junctionBoxRaw[key];
	return input;
}, reviseJunctionBox);

export const domainJunctionBox: DomainJunctionBox = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	permanentId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	mastId: new Prisma.Decimal(10),
	techViewId: new Prisma.Decimal(10),
	...junctionBoxRaw,
	deleted_at: null,
};

export const domainReviseJunctionBox: DomainJunctionBox = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	permanentId: '1f728e79-1b89-4333-a309-ea93bf17667c',
	mastId: new Prisma.Decimal(10),
	techViewId: new Prisma.Decimal(10),
	...reviseJunctionBoxRaw,
	deleted_at: null,
};

export const junctionBox = JunctionBoxFactory.CreateJunctionBox(domainJunctionBox);

export const deletedJunctionBox: DomainJunctionBox = {
	...domainJunctionBox,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
