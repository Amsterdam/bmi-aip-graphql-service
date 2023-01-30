import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { domainDefect } from './__stubs__';
import { DefectRepository } from './defect.repository';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	defects: {
		findUnique: jest.fn().mockResolvedValue(domainDefect),
	},
	...(<any>{}),
};

const repo = new DefectRepository(prismaServiceMock);

describe('TI / Defect / Repository', () => {
	test('getDefect()', async () => {
		expect(await repo.getDefect(domainDefect.id)).toEqual(domainDefect);
	});
});
