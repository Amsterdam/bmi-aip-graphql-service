import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { JunctionBoxService } from './junction-box.service';
import { JunctionBoxRepository } from './junction-box.repository';
import { domainJunctionBox } from './__stubs__';
import { JunctionBoxFactory } from './junction-box.factory';
import { JunctionBox } from './models/junction-box.model';

jest.mock('./junction-box.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new JunctionBoxRepository(prismaServiceMock);

describe('Span Installation / JunctionBox / Service', () => {
	test('getJunctionBoxs returns array of JunctionBox objects', async () => {
		const service = new JunctionBoxService(repo);
		const junctionBoxes = await service.getJunctionBoxes('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(junctionBoxes).toBeInstanceOf(Array);
		expect(junctionBoxes[0]).toBeInstanceOf(JunctionBox);
		expect(junctionBoxes).toEqual(
			[domainJunctionBox].map((junctionBox) => JunctionBoxFactory.CreateJunctionBox(junctionBox)),
		);
	});
});
