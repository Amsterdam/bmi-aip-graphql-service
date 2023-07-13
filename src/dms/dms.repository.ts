import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { catchError, map, single } from 'rxjs';

import {
	convertMetadataArrayToObject,
	DMSDocumentBase,
	DMSDocumentSpanInstallation,
	DmsMetadataSpanInstallationTypes,
	RawDMSDocument,
} from './types/dms-document-span-installation';
import { getSurveyInspectionType, InspectionStandard } from './../schema/survey/types';
import { mapMetadataSpanInstallation } from './types/map-metadata-span-installation';
import { DmsResponse } from './types/dms-response';

@Injectable()
export class DmsRepository {
	public constructor(
		private httpService: HttpService,
		private configService: ConfigService,
		private readonly prisma: PrismaService,
	) {}

	private apiUrl = this.configService.get<string>('DMS_API_URL');

	// private apiUsername = this.configService.get<string>('DMS_API_USERNAME');
	//
	// private apiPassword = this.configService.get<string>('DMS_API_PASSWORD');
	//
	// private apiKey = this.configService.get<string>('GISIB_API_KEY');

	// public login(): Promise<string> {
	// 	return new Promise((resolve, reject) => {
	// 		this.httpService
	// 			.post<string>(`${this.apiUrl}/login`, {
	// 				Username: this.apiUsername,
	// 				Password: this.apiPassword,
	// 				ApiKey: this.apiKey,
	// 			})
	// 			.pipe(
	// 				map((res) => res.data),
	// 				single(),
	// 				catchError((e) => {
	// 					throw new HttpException(e.statusText, e.status);
	// 				}),
	// 			)
	// 			.subscribe((token) => {
	// 				resolve(token);
	// 			});
	// 	});
	// }

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

	public async getSpanInstallationDocumentsFromDms<T extends DMSDocumentSpanInstallation>(
		token: string,
		assetId: string,
		surveyId?: string,
		entityId?: string,
	): Promise<T[]> {
		let object;

		if (assetId) {
			object = await this.prisma.objects.findUnique({
				where: { id: assetId },
			});
		}

		let url = this.apiUrl + 'documents?';

		if (object.code && object.code !== '') {
			url += 'code=' + object.code;
		} else {
			return [];
		}

		let surveyInspectionType: InspectionStandard;

		if (surveyId || entityId) {
			url += '&metadata=[';

			url += surveyId ? `{"key":"survey-id-overspanning","value":"${surveyId}"}` : '';
			url += surveyId && entityId ? ',' : '';
			url += entityId ? `{"key":"onderdeel-id","value":"${entityId}"}` : '';

			url += ']';
		}

		if (surveyId) {
			const survey = await this.prisma.surveys.findUnique({
				select: { inspectionStandardType: true },
				where: { id: surveyId },
			});

			surveyInspectionType = getSurveyInspectionType(survey.inspectionStandardType);
		}

		const response = new Promise((resolve) => {
			this.httpService
				.get<[]>(url, {
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

		const data: RawDMSDocument[] = await response;
		return (data || [])
			.map((doc) => this.mapMetadata(doc, surveyInspectionType) as T)
			.sort((a, b) => (a.name < b.name ? -1 : 1));
	}

	/**
	 * Maps metadata based on inspection type using the provided survey inspection type or alternatively using a
	 * type-guards for each category that determines if the passed metadata matches the category
	 */
	private mapMetadata(
		{ metadata, guid, name, mime_type, extension, pid, volgnummer }: RawDMSDocument,
		surveyInspectionType?: InspectionStandard,
	): DMSDocumentSpanInstallation {
		const metadataAsObject = convertMetadataArrayToObject(metadata);
		const base: DMSDocumentBase = {
			guid,
			name,
			mime_type,
			extension,
			pid,
			volgnummer,
			url: `/api/inforing/documents/${guid}/download`,
			rawMetadata: metadataAsObject,
		};

		if (surveyInspectionType === 'spanInstallation') {
			return {
				...base,
				...mapMetadataSpanInstallation(metadataAsObject as DmsMetadataSpanInstallationTypes),
			};
			throw new Error('[DMS] BUG Failed to determine the document type from the provided metadata');
		}
	}

	public async getFile(token: string, documentId: string) {
		const url = this.apiUrl + 'documents/downloadurl?guid=' + documentId;

		return new Promise((resolve) => {
			this.httpService
				.get<[]>(url, {
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

	/**
	 * @param {string} AssetId From Dms
	 */
	public async getDMSDocumentsAsset(surveyId: string, entityId: string): Promise<DmsResponse[]> {
		let url = this.apiUrl + 'documents?';

		if (surveyId || entityId) {
			url += '&metadata=[';

			url += surveyId ? `{"key":"survey-id-overspanning","value":"${surveyId}"}` : '';
			url += surveyId && entityId ? ',' : '';
			url += entityId ? `{"key":"onderdeel-id","value":"${entityId}"}` : '';

			url += ']';
		}

		return this.request<DmsResponse>(url);
	}

	// public async getDMSDocumentsAssetFilter(url: string): Promise<DmsResponse> {
	// 	return new Promise((resolve) => {
	// 		this.httpService
	// 			.post<DmsResponse>(url, {
	// 				headers: { Authorization: `Bearer ${token}` },
	// 				data: [
	// 					{
	// 						Criterias: [
	// 							{
	// 								Property: '',
	// 								Value: '',
	// 								Operator: 'Equal',
	// 							},
	// 						],
	// 						Operator: 'AND',
	// 					},
	// 				],
	// 			})
	// 			.pipe(
	// 				map((res) => res.data),
	// 				single(),
	// 				catchError((e) => {
	// 					throw new HttpException(e.statusText, e.status);
	// 				}),
	// 			)
	// 			.subscribe((v) => resolve(v));
	// 	});
	// }
}
