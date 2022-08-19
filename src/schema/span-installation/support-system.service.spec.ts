import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SupportSystemService } from './support-system.service';
import { SupportSystemRepository } from './support-system.repository';
import { domainSupportSystem } from './__stubs__';
import { SupportSystemFactory } from './support-system.factory';
import { SupportSystem } from './models/support-system.model';

jest.mock('./support-system.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new SupportSystemRepository(prismaServiceMock);

describe('Span Installation / SupportSystem / Service', () => {
	test('getSupportSystems returns array of SupportSystem objects', async () => {
		const service = new SupportSystemService(repo);
		const supportSystems = await service.getSupportSystems('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(supportSystems).toBeInstanceOf(Array);
		expect(supportSystems[0]).toBeInstanceOf(SupportSystem);
		expect(supportSystems).toEqual(
			[domainSupportSystem].map((supportSystem) => SupportSystemFactory.CreateSupportSystem(supportSystem)),
		);
	});
});
