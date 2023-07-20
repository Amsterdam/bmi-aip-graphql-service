import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DocumentService } from '../document.service';
import { DMSDocumentSpanInstallation } from '../../../dms/types/dms-document-span-installation';

import { FindDocumentsSpanInstallation } from './find-documents-span-installation.query';

@QueryHandler(FindDocumentsSpanInstallation)
export class FindDocumentsSpanInstallationHandler implements IQueryHandler<FindDocumentsSpanInstallation> {
	constructor(private service: DocumentService) {}

	public async execute(query: FindDocumentsSpanInstallation): Promise<DMSDocumentSpanInstallation[]> {
		return this.service.findSpanInstallationDocuments(
			query.assetId,
			query.surveyId,
			query.entityId,
			query.provider,
			query.ctx,
		);
	}
}
