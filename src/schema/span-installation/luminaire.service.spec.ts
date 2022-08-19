import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { LuminaireService } from './luminaire.service';
import { LuminaireRepository } from './luminaire.repository';
import { domainLuminaire } from './__stubs__';
import { LuminaireFactory } from './luminaire.factory';
import { Luminaire } from './models/luminaire.model';

jest.mock('./luminaire.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new LuminaireRepository(prismaServiceMock);

describe('Span Installation / Luminaire / Service', () => {
	test('getLuminaires returns array of Luminaire objects', async () => {
		const service = new LuminaireService(repo);
		const luminaires = await service.getLuminaires('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(luminaires).toBeInstanceOf(Array);
		expect(luminaires[0]).toBeInstanceOf(Luminaire);
		expect(luminaires).toEqual([domainLuminaire].map((luminaire) => LuminaireFactory.CreateLuminaire(luminaire)));
	});
});
