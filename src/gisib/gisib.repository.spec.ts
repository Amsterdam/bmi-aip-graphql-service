import { MockedObjectDeep } from 'ts-jest';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { HttpException, NotFoundException } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { NENElement } from './types/NENElement';
import { NENUnit } from './types/NENUnit';
import { GisibRepository } from './gisib.repository';
import {
	elements,
	units,
	gisibAssetResponse,
	gisibElementResponse,
	gisibUnitResponse,
	emptyGisibAssetResponse,
} from './__stubs__';
import { GisibResponse } from './types/GisibResponse';
import { GisibAsset } from './types/GisibAsset';

const mockApiUrl = 'https://test.nl/api/api';

const configService: MockedObjectDeep<ConfigService> = {
	get(key: string): string {
		switch (key) {
			case 'GISIB_API_URL':
				return mockApiUrl;
			case 'GISIB_API_USERNAME':
				return '__USERNAME__';
			case 'GISIB_API_PASSWORD':
				return '__PASSWORD__';
			case 'GISIB_API_KEY':
				return '__KEY__';
		}
	},
	...(<any>{}),
};

const httpService: MockedObjectDeep<HttpService> = {
	get: jest.fn(),
	post: jest.fn().mockReturnValue(
		of({
			data: '__TOKEN__',
		} as AxiosResponse<string>),
	),
	...(<any>{}),
};

describe('GisibRepository', () => {
	let repo;
	beforeAll(() => {
		repo = new GisibRepository(httpService, configService);
	});

	describe('login()', () => {
		test('retrieves a token for authentication', async () => {
			const token = await repo.login();
			expect(httpService.post).toHaveBeenCalledWith(`${mockApiUrl}/login`, {
				Username: '__USERNAME__',
				Password: '__PASSWORD__',
				ApiKey: '__KEY__',
			});
			expect(token).toBe('__TOKEN__');
		});
	});

	test('getGisibDataWithFilter()', async () => {
		jest.spyOn(repo, 'login').mockResolvedValue('__TOKEN__');
		const response: AxiosResponse<GisibResponse<GisibAsset>> = {
			data: gisibAssetResponse,
			headers: {},
			config: { url: 'https://test.nl/api/api/Collections/Civiele constructie/WithFilter/items' },
			status: 200,
			statusText: 'OK',
		};
		const spy = jest.spyOn(httpService, 'post').mockReturnValue(of(response));
		const result = await repo.getGisibDataWithFilter('BRU001', 'Objectnummer', '__URL__');
		expect(spy).toHaveBeenLastCalledWith('__URL__', {
			data: [{ Criterias: [{ Operator: 'Equal', Property: 'Objectnummer', Value: 'BRU001' }], Operator: 'AND' }],
			headers: { Authorization: 'Bearer __TOKEN__' },
		});
		expect(result).toEqual(gisibAssetResponse);
	});

	describe('getNENStandardElements()', () => {
		test('Should return elements', async () => {
			httpService.get.mockReturnValue(
				of({
					data: elements,
				} as AxiosResponse<NENElement[]>),
			);
			expect(await repo.getNENStandardElements()).toMatchObject(elements);
			expect(httpService.get).toHaveBeenCalledWith('https://test.nl/api/api/Collections/NEN Type element/items', {
				headers: { Authorization: 'Bearer __TOKEN__' },
			});
		});

		test('Should throw unauthorised httpException', async () => {
			const errorMessage = 'Test error message';
			httpService.get.mockImplementation(() => {
				throw new HttpException(errorMessage, 401);
			});
			await expect(repo.getNENStandardElements()).rejects.toThrow(HttpException);
		});
	});

	describe('getNENStandardUnits()', () => {
		test('Should return units', async () => {
			httpService.get.mockReturnValue(
				of({
					data: units,
				} as AxiosResponse<NENUnit[]>),
			);
			expect(await repo.getNENStandardUnits()).toMatchObject(units);
			expect(httpService.get).toHaveBeenCalledWith(
				'https://test.nl/api/api/Collections/NEN Type bouwdeel/items',
				{ headers: { Authorization: 'Bearer __TOKEN__' } },
			);
		});

		test('Should throw unauthorised httpException', async () => {
			const errorMessage = 'Test error message';
			httpService.get.mockImplementation(() => {
				throw new HttpException(errorMessage, 401);
			});
			await expect(repo.getNENStandardUnits()).rejects.toThrow(HttpException);
		});
	});

	describe('getAssetByCode()', () => {
		test('should return an asset', async () => {
			const spy = jest.spyOn(repo, 'getGisibDataWithFilter').mockResolvedValue(gisibAssetResponse);
			expect(await repo.getAssetByCode('BRU5032')).toMatchObject(gisibAssetResponse.features[0]);
			expect(spy).toHaveBeenCalledWith(
				'BRU5032',
				'Objectnummer',
				'https://test.nl/api/api/Collections/Civiele constructie/WithFilter/items',
			);
		});

		test('throws NotFoundException if feature is not found', async () => {
			jest.spyOn(repo, 'getGisibDataWithFilter').mockResolvedValue(emptyGisibAssetResponse);
			await expect(repo.getAssetByCode('BRU5033')).rejects.toThrow(NotFoundException);
		});
	});

	describe('getAssetElements()', () => {
		test("should return an assets' elements", async () => {
			const spy = jest.spyOn(repo, 'getGisibDataWithFilter').mockResolvedValue(gisibElementResponse);
			expect(await repo.getAssetElements(3399979)).toEqual(gisibElementResponse.features);
			expect(spy).toHaveBeenCalledWith(
				'3399979',
				'Civiele constructie.Id',
				'https://test.nl/api/api/Collections/NEN Element/WithFilter/items',
			);
		});
	});

	describe('getElementUnits()', () => {
		test('should return element units', async () => {
			const spy = jest.spyOn(repo, 'getGisibDataWithFilter').mockResolvedValue(gisibUnitResponse);
			expect(await repo.getElementUnits(653079)).toEqual(gisibUnitResponse.features);
			expect(spy).toHaveBeenCalledWith(
				'653079',
				'NEN Element.Id',
				'https://test.nl/api/api/Collections/NEN Bouwdeel/WithFilter/items',
			);
		});
	});
});
