import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { domainDefect } from './__stubs__';
import { DefectRepository } from './defect.repository';
import { DefectService } from './defect.service';
import { Defect } from './models/defect.model';
import { DefectFactory } from './defect.factory';

jest.mock('./defect.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new DefectRepository(prismaServiceMock);

describe('TI / Defect / Service', () => {
	test('getDefect returns a defect based on conditionId', async () => {
		const service = new DefectService(repo);
		const defect = await service.getDefect('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(defect).toBeInstanceOf(Defect);
		expect(defect).toEqual(DefectFactory.CreateDefect(domainDefect));
	});
});
