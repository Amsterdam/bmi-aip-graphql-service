import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ElementService } from './element.service';
import { ElementRepository } from './element.repository';
import { domainElement } from './__stubs__';
import { ElementFactory } from './element.factory';
import { Element } from './models/element.model';
import { ElementHasUnitsException } from './exceptions/element-has-units.exception';

import mocked = jest.mocked;

jest.mock('./element.repository');
jest.mock('./unit.repository');
jest.mock('./manifestation.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new ElementRepository(prismaServiceMock);

describe('Decomposition / Elements / Service', () => {
	test('getElements returns array of Element objects', async () => {
		const service = new ElementService(repo);
		const elements = await service.getElements('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toBeInstanceOf(Array);
		expect(elements[0]).toBeInstanceOf(Element);
		expect(elements).toEqual([domainElement].map((element) => ElementFactory.CreateElement(element)));
	});

	describe('deleteElement', () => {
		test('Throws ElementHasUnitsException exception if element has units', async () => {
			mocked(repo.hasUnits).mockResolvedValue(true);
			const service = new ElementService(repo);
			await expect(service.deleteElement(domainElement.id)).rejects.toThrow(ElementHasUnitsException);
		});

		test('Deletes element and returns it', async () => {
			mocked(repo.hasUnits).mockResolvedValue(false);
			const service = new ElementService(repo);
			const returnValue = await service.deleteElement(domainElement.id);
			expect(repo.deleteElement).toHaveBeenCalledWith(domainElement.id);
			expect(returnValue).toEqual(ElementFactory.CreateElement(domainElement));
		});
	});
});
