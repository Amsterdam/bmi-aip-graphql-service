import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ObjectTypeUnitCodeService } from './object-type-unit-code.service';
import { ObjectTypeUnitCodeRepository } from './object-type-unit-code.repository';
import { ObjectTypeUnitCode } from './models/object-type-unit-code.model';

jest.mock('./object-type-unit-code.service');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

describe('Decomposition / ObjectTypeUnitCodes / Service', () => {
	test('getObjectTypeUnitCodeByCode returns a single objectTypeUnitCode', async () => {
		const service = new ObjectTypeUnitCodeService(new ObjectTypeUnitCodeRepository(prismaServiceMock));
		const object = await service.getObjectTypeUnitCodeByCode('_UNIT__CODE__');
		expect(object).toBeInstanceOf(ObjectTypeUnitCode);
	});
});
