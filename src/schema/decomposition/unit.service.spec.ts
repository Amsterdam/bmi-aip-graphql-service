import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { UnitService } from './unit.service';
import { UnitRepository } from './unit.repository';
import { domainUnit } from './__stubs__';
import { UnitFactory } from './unit.factory';
import { Unit } from './models/unit.model';
import { ManifestationRepository } from './manifestation.repository';

jest.mock('./unit.repository');
jest.mock('./manifestation.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const unitRepo = new UnitRepository(prismaServiceMock, new ManifestationRepository(prismaServiceMock));

describe('Decomposition / Units / Service', () => {
	test('getUnits returns array of Unit objects', async () => {
		const service = new UnitService(unitRepo);
		const units = await service.getUnits('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(units).toBeInstanceOf(Array);
		expect(units[0]).toBeInstanceOf(Unit);
		expect(units).toEqual([domainUnit].map((unit) => UnitFactory.CreateUnit(unit)));
	});
});
