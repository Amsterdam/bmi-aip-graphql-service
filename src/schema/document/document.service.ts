import { Injectable } from '@nestjs/common';

import { DmsRepository } from '../../dms/dms.repository';
import { DmsUploadUrlResponse } from '../../dms/types/dms-upload-upload-url-response';
import { DMSDocumentSpanInstallation } from '../../dms/types/dms-document-span-installation';

import { DocumentProvider } from './types';

@Injectable()
export class DocumentService {
	public constructor(private readonly dmsRepository: DmsRepository) {}

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

	async getDocumentUploadUrl(
		assetCode: string,
		fileName: string,
		provider: DocumentProvider,
	): Promise<DmsUploadUrlResponse> {
		switch (provider) {
			case 'dms':
				this.dmsRepository.token = this.token;
				return this.dmsRepository.getDmsUploadUrl(fileName, assetCode);
			default:
				throw new Error('Provider not supported');
		}
	}

	async findSpanInstallationDocuments(
		assetId: string,
		surveyId: string,
		entityId: string,
		provider: 'dms',
	): Promise<DMSDocumentSpanInstallation[]> {
		switch (provider) {
			case 'dms':
				this.dmsRepository.token = this.token;
				return this.dmsRepository.findSpanInstallationDocumentsInDms(assetId, surveyId, entityId);
			default:
				throw new Error('Provider not supported');
		}
	}
}
