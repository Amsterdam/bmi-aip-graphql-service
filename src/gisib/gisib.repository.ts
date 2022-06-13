import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map, single } from 'rxjs';

import { NENElement } from './types/NENElement';
import { NENUnit } from './types/NENUnit';

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

	public async getAssetByCode<T = any>(assetCode: string): Promise<T> {
		const token = await this.login();

		return new Promise((resolve) => {
			this.httpService
				.post<T>(`${this.apiUrl}/Collections/Civiele constructie/WithFilter/items`, {
					headers: { Authorization: `Bearer ${token}` },
					data: [
						{
							Criterias: [
								{
									Property: 'Objectnummer',
									Value: assetCode,
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

	public getNENStandardElements(): Promise<NENElement[]> {
		return this.request<NENElement>(`${this.apiUrl}/Collections/NEN Type element/items`);
	}

	public async getNENStandardUnits(): Promise<NENUnit[]> {
		return this.request<NENUnit>(`${this.apiUrl}/Collections/NEN Type bouwdeel/items`);
	}
}
