import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DocumentService } from '../document.service';
import { DmsUploadUrlResponse } from '../../../dms/types/dms-upload-upload-url-response';

import { GetDocumentUploadUrlQuery } from './get-document-upload-url.query';

@QueryHandler(GetDocumentUploadUrlQuery)
export class GetDocumentUploadUrlHandler implements IQueryHandler<GetDocumentUploadUrlQuery> {
	constructor(private service: DocumentService) {}

	public async execute(query: GetDocumentUploadUrlQuery): Promise<DmsUploadUrlResponse> {
		return this.service.getDocumentUploadUrl(query.assetCode, query.fileName, query.provider, query.ctx);
	}
}
