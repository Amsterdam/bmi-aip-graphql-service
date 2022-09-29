import { gisibAsset } from '../../gisib/__stubs__/gisibAsset';
import { AssetStatuses } from '../../types';

import { AssetFactory } from './asset.factory';
import { dbAsset } from './__stubs__/dbAsset';
import { Asset } from './models/asset.model';
import { domainAsset } from './__stubs__';

describe('AssetFactory', () => {
	test('FromDBAsset() constructs an instance of Asset from DBAsset', () => {
		expect(AssetFactory.FromDBAsset(dbAsset)).toEqual(
			expect.objectContaining({
				clientCompanyId: 'da93b18e-8326-db37-6b30-1216f5b38b2c',
				code: 'BRU0670',
				id: 'dd456392-9c75-40c6-a861-48d393f78559',
				ownerCompanyId: 'da93b18e-8326-db37-6b30-1216f5b38b2c',
				status: 'inUse',
			}),
		);
	});

	test('FromCode() constructs a minimal Asset instance for a code', () => {
		const asset = new Asset();
		asset.code = 'BRU001';
		expect(AssetFactory.FromCode('BRU001')).toEqual(asset);
	});

	test('FromGisibAsset() constructs an Asset instance from a GisibFeature<GisibAsset>', () => {
		const { Id, Objectnaam, Status } = gisibAsset.properties;
		const asset = new Asset();
		asset.gisibId = Id;
		asset.name = Objectnaam;
		asset.status = (Status?.Description as keyof typeof AssetStatuses) || null;
		expect(AssetFactory.FromGisibAsset(gisibAsset)).toEqual(asset);
	});

	test('CreateAsset() constructs an instance of an Asset GraphQL model', () => {
		const result = AssetFactory.FromDBAsset(dbAsset);
		expect(result).toBeInstanceOf(Asset);
		expect(result).toEqual(expect.objectContaining(domainAsset));
	});

	test('CreateAssetInput', () => {
		const result = AssetFactory.FromDBAsset(dbAsset);
		expect(result).toEqual({
			...domainAsset,
		});
		expect(result).toBeInstanceOf(Asset);
	});
});
