import { MockedObjectDeep } from 'ts-jest';
import { PrismaService } from '../../prisma.service';
import { AssetRepository } from './asset.repository';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	$queryRaw: jest.fn().mockResolvedValue([{ code: 'BRU001' }, { code: 'BRU002' }]),
	...(<any>{}),
};

describe('AssetRepository', () => {
	test('getWritableAssetCodesForCompanyId()', async () => {
		const repo = new AssetRepository(prismaServiceMock);
		const codes = await repo.getWritableAssetCodesForCompanyId('__COMPANY_ID__');
		const [, arg2] = prismaServiceMock.$queryRaw.mock.calls[0];
		expect(arg2).toBe('__COMPANY_ID__');
		expect(codes).toEqual(['BRU001', 'BRU002']);
	});
});
