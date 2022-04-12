import { BatchesResolver } from './batches.resolver';

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

describe('Batches / Resolver', () => {
	test('getBatchById returns an batch object', async () => {
		const resolver = new BatchesResolver(prismaServiceMock);
		expect(await resolver.GetBatchById('665d167e-c2db-86ab-133b-fdfeb8aa1ea3')).toEqual({
			id: undefined,
			name: undefined,
		});
	});
});
