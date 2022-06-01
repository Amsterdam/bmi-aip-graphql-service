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
});
