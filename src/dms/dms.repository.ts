import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map, single } from 'rxjs';

import { PrismaService } from '../prisma.service';
import { InspectionStandard } from '../schema/survey/types';

import {
	convertMetadataArrayToObject,
	DMSDocumentBase,
	DMSDocumentSpanInstallation,
	DmsMetadataSpanInstallationTypes,
	RawDMSDocument,
} from './types/dms-document-span-installation';
import { mapMetadataSpanInstallation } from './types/map-metadata-span-installation';
import { DmsResponse } from './types/dms-response';
import { DmsUploadUrlResponse } from './types/dms-upload-upload-url-response';
import { TokenNotSetException } from './exceptions/token-not-set.exception';

@Injectable()
export class DmsRepository {
	public constructor(
		private httpService: HttpService,
		private configService: ConfigService,
		private readonly prisma: PrismaService,
	) {}

	private apiUrl = this.configService.get<string>('DMS_API_URL');

	/**
	 * Token gets set from the initiator as access to the execution context is required to retrieve the token
	 * @private
	 */
	private _token = '';

	set token(token: string) {
		this._token = token;
	}

	get token() {
		return this._token;
	}

	private async request<T = any>(url: string): Promise<T[]> {
		if (!this.token) {
			throw new TokenNotSetException();
		}

		return new Promise((resolve) => {
			this.httpService
				.get<T[]>(url, {
					headers: { Authorization: `Bearer ${this.token}` },
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
		if (!this.token) {
			throw new TokenNotSetException();
		}

		return new Promise((resolve) => {
			this.httpService
				.post<T[]>(url, data, {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				.subscribe(function (response) {
					resolve(response.data);
				});
		});
	}

	public async findSpanInstallationDocumentsInDms<T extends DMSDocumentSpanInstallation>(
		assetId: string,
		surveyId?: string,
		entityId?: string,
	): Promise<T[]> {
		let url = this.apiUrl + 'documents?';

		try {
			const object = await this.prisma.objects.findUnique({
				where: { id: assetId },
			});
			if (object.code && object.code !== '') {
				url += 'code=' + object.code;
			}
		} catch (err) {
			throw new NotFoundException('Unable to determine object code for assetId: ' + assetId);
		}

		if (surveyId || entityId) {
			url += '&metadata=[';

			url += surveyId ? `{"key":"survey-id-overspanning","value":"${surveyId}"}` : '';
			url += surveyId && entityId ? ',' : '';
			url += entityId ? `{"key":"onderdeel-id","value":"${entityId}"}` : '';

			url += ']';
		}

		if (surveyId) {
			await this.prisma.surveys.findUnique({
				select: { inspectionStandardType: true },
				where: { id: surveyId },
			});
		}

		const response = new Promise<RawDMSDocument[]>((resolve) => {
			this.httpService
				.get<[]>(url, {
					headers: { Authorization: `Bearer ${this.token}` },
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
			.map(
				function (doc: RawDMSDocument) {
					return doc;
				}.bind(this),
			)
			.sort((a: RawDMSDocument, b: RawDMSDocument) => (a.name < b.name ? -1 : 1)) as T[];
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

	public getUrl() {
		return this.apiUrl;
	}

	async getDmsUploadUrl(filename: string, assetCode: string): Promise<DmsUploadUrlResponse> {
		const data = {
			asset_code: assetCode,
			file_name: filename,
		};
		const uploadUrl = this.apiUrl + 'documents/uploadurl';

		return this.post<DmsUploadUrlResponse>(uploadUrl, data);
	}
}
