import { SupplierType } from '../../../types';

import { Luminaire } from './luminaire.model';

describe('Span Installation / Model / Luminaire', () => {
	test('constructs a Luminaire instance', () => {
		const luminaire = new Luminaire();
		luminaire.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';
		luminaire.supportSystemId = 'cecc214d-1c44-4bcd-94e2-f2d661327db3';
		luminaire.location = null;
		luminaire.constructionYear = 1979;
		luminaire.supplierType = SupplierType.two;
		luminaire.manufacturer = '__MANUFACTURER__';
		luminaire.geography = {
			type: 'Point',
			coordinates: [52.37593907780107, 4.894690444015065],
		};
		luminaire.remarks = '__REMARKS__';

		// Driver
		luminaire.driverSupplierType = SupplierType.one;
		luminaire.driverCommissioningDate = null;

		// Light
		luminaire.lightSupplierType = SupplierType.two;
		luminaire.lightCommissioningDate = '';

		luminaire.createdAt = '2022-08-02T15:51:54.044Z';
		luminaire.updatedAt = '2022-08-02T15:52:54.044Z';
		luminaire.deletedAt = '2022-08-02T15:53:07.441Z';

		expect(luminaire).toBeInstanceOf(Luminaire);
		expect(luminaire).toEqual({
			constructionYear: 1979,
			createdAt: '2022-08-02T15:51:54.044Z',
			deletedAt: '2022-08-02T15:53:07.441Z',
			driverCommissioningDate: null,
			driverSupplierType: 'one',
			geography: {
				coordinates: [52.37593907780107, 4.894690444015065],
				type: 'Point',
			},
			id: '71c5450a-c0a3-48ea-adbb-ea435a8804d5',
			lightCommissioningDate: '',
			lightSupplierType: 'two',
			location: null,
			manufacturer: '__MANUFACTURER__',
			remarks: '__REMARKS__',
			supplierType: 'two',
			supportSystemId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
			updatedAt: '2022-08-02T15:52:54.044Z',
		});
	});
});
