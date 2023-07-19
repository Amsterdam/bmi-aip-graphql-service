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
import { DmsUploadUrlResponse } from './types/dms-upload-upload-url-response';

@Injectable()
export class DmsRepository {
	public constructor(
		private httpService: HttpService,
		private configService: ConfigService,
		private readonly prisma: PrismaService,
	) {}

	private apiUrl = this.configService.get<string>('DMS_API_URL');

	private token = '';

	public setToken(token: string) {
		this.token = token;
	}

	private getToken() {
		return this.token;
	}

	private async request<T = any>(url: string): Promise<T[]> {
		const token = this.getToken();

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

	private async post<T = any>(url: string, data: object): Promise<any> {
		const token = this.getToken();

		return new Promise((resolve) => {
			this.httpService
				.post<T[]>(url, data, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.subscribe(function (response) {
					resolve(response.data);
				});
		});
	}

	public async getSpanInstallationDocumentsFromDms<T extends DMSDocumentSpanInstallation>(
		assetId: string,
		surveyId?: string,
		entityId?: string,
	): Promise<T[]> {
		let object;
		const token = this.getToken();

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

		const response = new Promise<RawDMSDocument[]>((resolve) => {
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

		const resp = (data || [])
			.map(
				function (doc: any) {
					return this.mapMetadata(doc, surveyInspectionType) as T;
				}.bind(this),
			)
			.sort((a: RawDMSDocument, b: RawDMSDocument) => (a.name < b.name ? -1 : 1)) as T[];

		return resp;
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

	public getUrl() {
		return this.apiUrl;
	}

	async getDmsUploadUrl(filename: string, assetCode: string): Promise<DmsUploadUrlResponse> {
		const data = {
			asset_code: assetCode,
			file_name: filename,
		};

		const uploadUrl = this.apiUrl + 'documents/uploadurl';

		const dmsResponse = await this.post<DmsUploadUrlResponse>(uploadUrl, data);

		return dmsResponse;
	}
}
