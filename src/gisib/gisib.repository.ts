import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';

import { NENElement } from './types/NENElement';
import { NENUnit } from './types/NENUnit';

@Injectable()
export class GisibRepository {
	public constructor(private httpService: HttpService, private configService: ConfigService) {}

	private apiUrl = this.configService.get<string>('GISIB_API_URL');

	public async getNENStandardElements(token: string): Promise<NENElement[]> {
		// @ts-ignore
		const nenElements: NENElement[] = this.httpService
			.get(`${this.apiUrl}/Collections/NEN Type element/items`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.pipe(
				map((res) => res.data),
				catchError((e) => {
					throw new HttpException(e.statusText, e.status);
				}),
			);
		return nenElements;
	}

	public async getNENStandardUnits(token: string): Promise<NENUnit[]> {
		// @ts-ignore
		const nenUnits: NENUnits[] = await this.httpService
			.get(`${this.apiUrl}/Collections/NEN Type bouwdeel/items`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.pipe(
				map((res) => res.data),
				catchError((e) => {
					throw new HttpException(e.statusText, e.status);
				}),
			);

		return nenUnits;
	}
}
