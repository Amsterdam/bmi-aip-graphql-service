import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { DmsRepository } from '../../dms/dms.repository';
import { DmsUploadUrlResponse } from '../../dms/types/dms-upload-upload-url-response';

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
}
