import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map, single } from 'rxjs';

import { NENElement } from './types/NENElement';
import { NENUnit } from './types/NENUnit';
import { GisibResponse } from './types/GisibResponse';
import { GisibFeature } from './types/GisibFeature';
import { GisibAsset } from './types/GisibAsset';
import { GisibElement } from './types/GisibElement';
import { GisibUnit } from './types/GisibUnit';

@Injectable()
export class GisibRepository {
	public constructor(private httpService: HttpService, private configService: ConfigService) {}

	private apiUrl = this.configService.get<string>('GISIB_API_URL');

	private apiUsername = this.configService.get<string>('GISIB_API_USERNAME');

	private apiPassword = this.configService.get<string>('GISIB_API_PASSWORD');

	private apiKey = this.configService.get<string>('GISIB_API_KEY');

	public login(): Promise<string> {
		return new Promise((resolve) => {
			this.httpService
				.post<string>(`${this.apiUrl}/login`, {
					Username: this.apiUsername,
					Password: this.apiPassword,
					ApiKey: this.apiKey,
				})
				.pipe(
					map((res) => res.data),
					single(),
					catchError((e) => {
						throw new HttpException(e.statusText, e.status);
					}),
				)
				.subscribe((token) => resolve(token));
		});
	}

	private async request<T = any>(url: string): Promise<T[]> {
		const token = await this.login();

		return new Promise((resolve) => {
			this.httpService
				.get<T[]>(url, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.pipe(
					map((res) => res.data),
					single(),
					catchError((e) => {
						throw new HttpException(e.statusText, e.status);
					}),
				)
				.subscribe((values) => resolve(values));
		});
	}

	public async getGisibDataWithFilter<T = any>(
		value: string,
		property: string,
		url: string,
	): Promise<GisibResponse<T>> {
		const token = await this.login();

		return new Promise((resolve) => {
			this.httpService
				.post<GisibResponse<T>>(url, {
					headers: { Authorization: `Bearer ${token}` },
					data: [
						{
							Criterias: [
								{
									Property: property,
									Value: value,
									Operator: 'Equal',
								},
							],
							Operator: 'AND',
						},
					],
				})
				.pipe(
					map((res) => res.data),
					single(),
					catchError((e) => {
						throw new HttpException(e.statusText, e.status);
					}),
				)
				.subscribe((v) => resolve(v));
		});
	}

	public async getAssetByCode(code): Promise<GisibFeature<GisibAsset> | undefined> {
		const { features } = await this.getGisibDataWithFilter<GisibAsset>(
			code,
			'Objectnummer',
			`${this.apiUrl}/Collections/Civiele constructie/WithFilter/items`,
		);
		return features?.[0].properties.Objectnummer === code ? features?.[0] : undefined;
	}

	public async getAssetElements(assetId): Promise<GisibFeature<GisibElement>[]> {
		const { features } = await this.getGisibDataWithFilter<GisibElement>(
			assetId,
			'Civiele constructie.Id',
			`${this.apiUrl}/Collections/NEN Element/WithFilter/items`,
		);
		return features;
	}

	public async getElementUnits(elementId): Promise<GisibFeature<GisibUnit>[]> {
		const { features } = await this.getGisibDataWithFilter<GisibUnit>(
			elementId,
			'NEN Element.Id',
			`${this.apiUrl}/Collections/NEN Bouwdeel/WithFilter/items`,
		);
		return features;
	}

	public getNENStandardElements(): Promise<NENElement[]> {
		return this.request<NENElement>(`${this.apiUrl}/Collections/NEN Type element/items`);
	}

	public async getNENStandardUnits(): Promise<NENUnit[]> {
		return this.request<NENUnit>(`${this.apiUrl}/Collections/NEN Type bouwdeel/items`);
	}
}
