import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ElementService } from './element.service';
import { ElementRepository } from './element.repository';
import { domainElement } from './__stubs__';
import { ElementFactory } from './element.factory';
import { Element } from './models/element.model';
import { UnitRepository } from './unit.repository';
import { ManifestationRepository } from './manifestation.repository';

jest.mock('./element.repository');
jest.mock('./unit.repository');
jest.mock('./manifestation.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const unitRepo = new UnitRepository(prismaServiceMock, new ManifestationRepository(prismaServiceMock));
const repo = new ElementRepository(prismaServiceMock, unitRepo);

describe('Decomposition / Elements / Service', () => {
	test('getElements returns array of Element objects', async () => {
		const service = new ElementService(repo);
		const elements = await service.getElements('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toBeInstanceOf(Array);
		expect(elements[0]).toBeInstanceOf(Element);
		expect(elements).toEqual([domainElement].map((element) => ElementFactory.CreateElement(element)));
	});
});
