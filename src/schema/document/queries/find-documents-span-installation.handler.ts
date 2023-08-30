import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DocumentService } from '../document.service';
import { DMSDocumentSpanInstallation } from '../../../dms/types/dms-document-span-installation';

import { FindDocumentsSpanInstallationQuery } from './find-documents-span-installation.query';

@QueryHandler(FindDocumentsSpanInstallationQuery)
export class FindDocumentsSpanInstallationHandler implements IQueryHandler<FindDocumentsSpanInstallationQuery> {
	constructor(private service: DocumentService) {}

	public async execute({
		assetId,
		surveyId,
		entityId,
		provider,
		jwtToken,
	}: FindDocumentsSpanInstallationQuery): Promise<DMSDocumentSpanInstallation[]> {
		this.service.token = jwtToken;
		return this.service.findSpanInstallationDocuments(assetId, surveyId, entityId, provider);
	}
}
