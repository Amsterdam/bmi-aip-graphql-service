import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ElementRepository } from './element.repository';
import { domainElement, elementInput, updateElementInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	elements: {
		create: jest.fn().mockResolvedValue(domainElement),
		update: jest.fn().mockResolvedValue(domainElement),
	},
	...(<any>{}),
};

describe('ElementRepository', () => {
	test('createElement()', async () => {
		const repo = new ElementRepository(prismaServiceMock);
		await repo.createElement(elementInput);
		expect(prismaServiceMock.elements.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				objects: {
					connect: {
						id: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
					},
				},
				surveys: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
					},
				},
				elementCategories: {
					connect: {
						id: 'a13d3055-9447-6178-91d7-386ebbc418f4',
					},
				},
				code: '__CODE__',
				name: '__NAME__',
				location: '__LOCATION__',
				constructionYear: 2010,
				isRelevant: true,
				isStructural: true,
				isElectrical: false,
				isStructuralObjectSpecific: false,
				isElectricalObjectSpecific: false,
				constructionType: '',
				elementGroupName: '',
				isArchived: false,
				gisibId: '',
			}),
		});
	});

	test('updateElement()', async () => {
		const repo = new ElementRepository(prismaServiceMock);
		await repo.updateElement(updateElementInput);
		expect(prismaServiceMock.elements.update).toHaveBeenCalledWith({
			where: { id: updateElementInput.id },
			data: expect.objectContaining({
				elementCategories: {
					connect: {
						id: 'a13d3055-9447-6178-91d7-386ebbc418f4',
					},
				},
				code: '__CODE__',
				name: '__NAME__',
				location: '__LOCATION__',
				constructionYear: 2010,
				isRelevant: true,
				isStructural: true,
				isElectrical: false,
				isStructuralObjectSpecific: false,
				isElectricalObjectSpecific: false,
				constructionType: '',
				elementGroupName: '',
				isArchived: false,
				gisibId: '',
			}),
		});
	});
});
