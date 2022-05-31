import { MockedObjectDeep } from 'ts-jest';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { from, Observable } from 'rxjs';
import { HttpException } from '@nestjs/common';

import { NENElement } from './types/NENElement';
import { NENUnit } from './types/NENUnit';
import { GisibRepository } from './gisib.repository';
import { elements } from './__stubs__/elements';
import { units } from './__stubs__/units';

const configService: MockedObjectDeep<ConfigService> = {
	get(key: string): string {
		switch (key) {
			case 'GISIB_API_URL':
				return 'https://test.nl/api/api';
		}
	},
	...(<any>{}),
};

describe('GisibRepository', () => {
	describe('getNENStandardElements()', () => {
		const httpService: MockedObjectDeep<HttpService> = {
			get: jest.fn(() => ({
				pipe: jest.fn(() => elements),
			})),
			...(<any>{}),
		};
		test('Should return elements', async () => {
			const observable: Observable<NENElement> = from(elements);
			// @ts-ignore
			httpService.get.getMockImplementation(observable);
			const repo = new GisibRepository(httpService, configService);
			const NENelements = await repo.getNENStandardElements('__TOKEN__');
			expect(httpService.get).toHaveBeenCalledWith('https://test.nl/api/api/Collections/NEN Type element/items', {
				headers: { Authorization: 'Bearer __TOKEN__' },
			});
			expect(NENelements).toMatchObject(elements);
		});

		test('Should throw unauthorised httpException', async () => {
			const errorMessage = 'Test error message';
			httpService.get.mockImplementation(() => {
				throw new HttpException(errorMessage, 401);
			});
			const repo = new GisibRepository(httpService, configService);

			await expect(repo.getNENStandardElements('__TOKEN__')).rejects.toThrow(HttpException);
		});
	});
	describe('getNENStandardUnits()', () => {
		const httpService: MockedObjectDeep<HttpService> = {
			get: jest.fn(() => ({
				pipe: jest.fn(() => units),
			})),
			...(<any>{}),
		};
		test('Should return units', async () => {
			const observable: Observable<NENUnit> = from(units);
			// @ts-ignore
			httpService.get.getMockImplementation(observable);
			const repo = new GisibRepository(httpService, configService);
			const NENUnits = await repo.getNENStandardUnits('__TOKEN__');
			expect(httpService.get).toHaveBeenCalledWith(
				'https://test.nl/api/api/Collections/NEN Type bouwdeel/items',
				{ headers: { Authorization: 'Bearer __TOKEN__' } },
			);
			expect(NENUnits).toMatchObject(units);
		});

		test('Should throw unauthorised httpException', async () => {
			const errorMessage = 'Test error message';
			httpService.get.mockImplementation(() => {
				throw new HttpException(errorMessage, 401);
			});
			const repo = new GisibRepository(httpService, configService);

			await expect(repo.getNENStandardElements('__TOKEN__')).rejects.toThrow(HttpException);
		});
	});
});
