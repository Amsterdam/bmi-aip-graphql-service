import { MockedObjectDeep } from 'ts-jest';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { HttpException } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { NENElement } from './types/NENElement';
import { NENUnit } from './types/NENUnit';
import { GisibRepository } from './gisib.repository';
import { elements } from './__stubs__/elements';
import { units } from './__stubs__/units';
import { gisibAssetResponse } from './__stubs__/GisibAssetResponse';

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
	post: jest.fn(),
	...(<any>{}),
};

describe('GisibRepository', () => {
	test('login() retrieves a token for authentication', async () => {
		httpService.post.mockReturnValue(
			of({
				data: '__TOKEN__',
			} as AxiosResponse<string>),
		);
		const repo = new GisibRepository(httpService, configService);
		const token = await repo.login();
		expect(httpService.post).toHaveBeenCalledWith(`${mockApiUrl}/login`, {
			Username: '__USERNAME__',
			Password: '__PASSWORD__',
			ApiKey: '__KEY__',
		});
		expect(token).toBe('__TOKEN__');
	});

	describe('getNENStandardElements()', () => {
		test('Should return elements', async () => {
			httpService.get.mockReturnValue(
				of({
					data: elements,
				} as AxiosResponse<NENElement[]>),
			);
			const repo = new GisibRepository(httpService, configService);
			jest.spyOn(repo, 'login').mockResolvedValue('__TOKEN__');
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
			const repo = new GisibRepository(httpService, configService);
			jest.spyOn(repo, 'login').mockResolvedValue('__TOKEN__');
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
			const repo = new GisibRepository(httpService, configService);
			jest.spyOn(repo, 'login').mockResolvedValue('__TOKEN__');
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
			const repo = new GisibRepository(httpService, configService);
			jest.spyOn(repo, 'login').mockResolvedValue('__TOKEN__');
			await expect(repo.getNENStandardElements()).rejects.toThrow(HttpException);
		});
	});
	describe('getAssetByCode()', () => {
		test('should return an asset', async () => {
			const repo = new GisibRepository(httpService, configService);
			jest.spyOn(repo, 'login').mockResolvedValue('__TOKEN__');
			const data = [
				{
					Criterias: [
						{
							Property: 'Objectnummer',
							Value: 'BRU5032',
							Operator: 'Equal',
						},
					],
					Operator: 'AND',
				},
			];
			const response: AxiosResponse<any> = {
				data: gisibAssetResponse,
				headers: {},
				config: { url: 'https://test.nl/api/api/Collections/Civiele constructie/WithFilter/items' },
				status: 200,
				statusText: 'OK',
			};
			jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(response));
			expect(await repo.getAssetByCode('BRU5032')).toMatchObject(gisibAssetResponse);
			expect(httpService.post).toHaveBeenCalledWith(
				'https://test.nl/api/api/Collections/Civiele constructie/WithFilter/items',
				{ headers: { Authorization: 'Bearer __TOKEN__' }, data },
			);
		});
		test('Should throw unauthorised httpException', async () => {
			const errorMessage = 'Test error message';
			httpService.post.mockImplementation(() => {
				throw new HttpException(errorMessage, 401);
			});
			const repo = new GisibRepository(httpService, configService);
			jest.spyOn(repo, 'login').mockResolvedValue('__TOKEN__');
			await expect(repo.getAssetByCode('__CODE__')).rejects.toThrow(HttpException);
		});
	});
});
