import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map, single } from 'rxjs';

import { NENElement } from './types/NENElement';
import { NENUnit } from './types/NENUnit';
import { GisibAssetResponse } from './types/GisibAssetResponse';

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

	public async getGisbDataWithFilter<T = any>(code: string, Property: string, url: string): Promise<T> {
		const token = await this.login();

		return new Promise((resolve) => {
			this.httpService
				.post<T>(url, {
					headers: { Authorization: `Bearer ${token}` },
					data: [
						{
							Criterias: [
								{
									Property: 'Objectnummer',
									Value: code,
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
				.subscribe((value) => resolve(value));
		});
	}

	public getAssetByCode(code): Promise<GisibAssetResponse> {
		return this.getGisbDataWithFilter(
			code,
			'Civiele constructie.Id',
			`${this.apiUrl}/Collections/Civiele constructie/WithFilter/items`,
		);
	}

	public getAssetElements(code): Promise<GisibAssetResponse> {
		return this.getGisbDataWithFilter(
			code,
			'NEN Element.Id',
			`${this.apiUrl}/Collections/NEN Element/WithFilter/items`,
		);
	}

	public getElementUnits(code): Promise<GisibAssetResponse> {
		return this.getGisbDataWithFilter(
			code,
			'NEN Bouwdeel.Id',
			`${this.apiUrl}/Collections/NEN Bouwdeel/WithFilter/items`,
		);
	}

	public getNENStandardElements(): Promise<NENElement[]> {
		return this.request<NENElement>(`${this.apiUrl}/Collections/NEN Type element/items`);
	}

	public async getNENStandardUnits(): Promise<NENUnit[]> {
		return this.request<NENUnit>(`${this.apiUrl}/Collections/NEN Type bouwdeel/items`);
	}
}
