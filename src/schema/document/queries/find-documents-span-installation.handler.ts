import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DocumentService } from '../document.service';
import { DMSDocumentSpanInstallation } from '../../../dms/types/dms-document-span-installation';

import { FindDocumentsSpanInstallationQuery } from './find-documents-span-installation.query';

@QueryHandler(FindDocumentsSpanInstallationQuery)
export class FindDocumentsSpanInstallationHandler implements IQueryHandler<FindDocumentsSpanInstallationQuery> {
	constructor(private service: DocumentService) {}

	public async execute(query: FindDocumentsSpanInstallationQuery): Promise<DMSDocumentSpanInstallation[]> {
		return this.service.findSpanInstallationDocuments(
			query.assetId,
			query.surveyId,
			query.entityId,
			query.provider,
			query.ctx,
		);
	}
}
