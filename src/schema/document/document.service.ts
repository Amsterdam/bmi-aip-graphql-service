import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { DmsRepository } from '../../dms/dms.repository';
import { DmsUploadUrlResponse } from '../../dms/types/dms-upload-upload-url-response';
import { DMSDocumentSpanInstallation } from '../../dms/types/dms-document-span-installation';

@Injectable()
export class DocumentService {
	public constructor(private readonly http: HttpService, private readonly dmsRepository: DmsRepository) {}

	async getDocumentUploadUrl(
		assetCode: string,
		fileName: string,
		provider: string,
		ctx: any,
	): Promise<DmsUploadUrlResponse> {
		switch (provider) {
			case 'dms':
				this.dmsRepository.setToken(ctx.req.accessTokenJWT);
				return this.dmsRepository.getDmsUploadUrl(fileName, assetCode);
				break;
			default:
				throw new Error('Provider not supported');
				break;
		}
	}

	async findSpanInstallationDocuments(
		assetId: string,
		surveyId: string,
		entityId: string,
		provider: string,
		ctx: any,
	): Promise<DMSDocumentSpanInstallation[]> {
		switch (provider) {
			case 'dms':
				this.dmsRepository.setToken(ctx.req.accessTokenJWT);
				return this.dmsRepository.findSpanInstallationDocumentsInDms(assetId, surveyId, entityId);
				break;
			default:
				throw new Error('Provider not supported');
				break;
		}
	}
}
