import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DocumentService } from '../document.service';
import { DmsUploadUrlResponse } from '../../../dms/types/dms-upload-upload-url-response';

import { GetDocumentUploadUrl } from './get-document-upload-url.query';

@QueryHandler(GetDocumentUploadUrl)
export class GetDocumentUploadUrlHandler implements IQueryHandler<GetDocumentUploadUrl> {
	constructor(private service: DocumentService) {}

	public async execute(query: GetDocumentUploadUrl): Promise<DmsUploadUrlResponse> {
		return this.service.getDocumentUploadUrl(query.assetCode, query.fileName, query.provider, query.ctx);
	}
}
