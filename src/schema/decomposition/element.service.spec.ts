import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ElementService } from './element.service';
import { ElementRepository } from './element.repository';
import { domainElement } from './__stubs__';
import { ElementFactory } from './element.factory';
import { Element } from './models/element.model';

jest.mock('./element.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

describe('Decomposition / Elements / Service', () => {
	test('getElements returns array of Element objects', async () => {
		const service = new ElementService(new ElementRepository(prismaServiceMock));
		const elements = await service.getElements('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toBeInstanceOf(Array);
		expect(elements[0]).toBeInstanceOf(Element);
		expect(elements).toEqual([domainElement].map((element) => ElementFactory.CreateElement(element)));
	});
});
