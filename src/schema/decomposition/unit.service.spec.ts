import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { UnitService } from './unit.service';
import { UnitRepository } from './unit.repository';
import { domainUnit } from './__stubs__';
import { UnitFactory } from './unit.factory';
import { Unit } from './models/unit.model';
import { UnitHasManifestationsException } from './exceptions/unit-has-manifestations.exception';

import mocked = jest.mocked;

jest.mock('./unit.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	getUnitsBySurveyId: jest.fn().mockResolvedValue(domainUnit),
	...(<any>{}),
};

const unitRepo = new UnitRepository(prismaServiceMock);

describe('Decomposition / Units / Service', () => {
	test('getUnits returns array of Unit objects', async () => {
		const service = new UnitService(unitRepo);
		const units = await service.getUnits('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(units).toBeInstanceOf(Array);
		expect(units[0]).toBeInstanceOf(Unit);
		expect(units).toEqual([domainUnit].map((unit) => UnitFactory.CreateUnit(unit)));
	});

	describe('deleteUnit', () => {
		test('Throws UnitHasManifestationsException exception if element has units', async () => {
			mocked(unitRepo.hasManifestations).mockResolvedValue(true);
			const service = new UnitService(unitRepo);
			await expect(service.deleteUnit(domainUnit.id)).rejects.toThrow(UnitHasManifestationsException);
		});

		test('Deletes element and returns it', async () => {
			mocked(unitRepo.hasManifestations).mockResolvedValue(false);
			const service = new UnitService(unitRepo);
			const returnValue = await service.deleteUnit(domainUnit.id);
			expect(unitRepo.deleteUnit).toHaveBeenCalledWith(domainUnit.id);
			expect(returnValue).toEqual(UnitFactory.CreateUnit(domainUnit));
		});
	});
});
