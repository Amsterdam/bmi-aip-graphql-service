import { Asset } from './asset.model';

describe('Asset / Model', () => {
	test('constructs an Asset instance object', () => {
		const asset = new Asset();
		asset.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		asset.status = 'inUse';
		asset.ownerCompanyId = '9812a0c4-9cb4-4df2-b490-7a5648922f34';
		asset.clientCompanyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';

		expect(asset).toEqual({
			id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			status: 'inUse',
			ownerCompanyId: '9812a0c4-9cb4-4df2-b490-7a5648922f34',
			clientCompanyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
		});
	});
});
