import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { UnitRepository } from './unit.repository';
import { domainUnit, unitInput } from './__stubs__/unit';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	units: {
		create: jest.fn().mockResolvedValue(domainUnit),
	},
	...(<any>{}),
};

describe('UnitRepository', () => {
	test('create()', async () => {
		const repo = new UnitRepository(prismaServiceMock);
		await repo.createUnit(unitInput);
		expect(prismaServiceMock.units.create).toHaveBeenCalledWith({
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
				elements: {
					connect: {
						id: 'a13d3055-9447-6178-91d7-386ebbc418f4',
					},
				},
				code: '__CODE__',
				name: '__NAME__',
				location: '__LOCATION__',
				material: '__MATERIAL__',
				quantity: 3,
				quantityUnitOfMeasurement: 'm2',
				isRelevant: true,
				constructionYear: 2010,
				isStructural: true,
				isElectrical: false,
				isStructuralObjectSpecific: false,
				isElectricalObjectSpecific: false,
			}),
		});
	});
});
