import { QueryBus } from '@nestjs/cqrs';
import { MockedObjectDeep } from 'ts-jest';

import { BatchResolver } from './batch.resolver';

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		return;
	}),
	...(<any>{}),
});
const queryBusMock = getQueryBusMock();

let prismaServiceMock;

beforeEach(() => {
	const PrismaServiceJest = jest.fn(() => ({
		batches: {
			delete: jest.fn(() => {
				return;
			}),
			update: jest.fn(() => {
				return;
			}),
			create: jest.fn(() => {
				return;
			}),
			findUnique: jest.fn(() => ({ id: undefined, name: undefined })),
			findFirst: jest.fn(() => {
				return;
			}),
			findMany: jest.fn(() => {
				return [];
			}),
		},
	}));
	prismaServiceMock = new PrismaServiceJest();
});

describe('Batch / Resolver', () => {
	test('getBatchById returns a batch object', async () => {
		const resolver = new BatchResolver(prismaServiceMock, queryBusMock);
		expect(await resolver.getBatchById('665d167e-c2db-86ab-133b-fdfeb8aa1ea3')).toEqual({
			id: undefined,
			name: undefined,
		});
	});
});
