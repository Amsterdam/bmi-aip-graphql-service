import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { QueryBus } from '@nestjs/cqrs';

import { DmsUploadUrlResponse } from '../../dms/types/dms-upload-upload-url-response';
import { DMSDocumentSpanInstallation } from '../../dms/types/dms-document-span-installation';

import { Document } from './models/document.model';
import { DMSDocumentSpanInstallation as DMSDocumentSpanInstallationGQLModel } from './models/dms-document-span-installation';
import { FindDocumentsSpanInstallationQuery } from './queries/find-documents-span-installation.query';
import { GetDocumentUploadUrlQuery } from './queries/get-document-upload-url.query';
import { DocumentProvider } from './types';

@Resolver((of) => Document)
@Resource(Document.name)
export class DocumentResolver {
	constructor(private readonly queryBus: QueryBus) {}

	@Query(() => Document)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getDocumentUploadUrl(
		@Args('assetCode') assetCode: string,
		@Args('fileName') fileName: string,
		@Args({ name: 'provider', defaultValue: 'dms' }) provider: DocumentProvider,
		@Context() ctx: any,
	): Promise<DmsUploadUrlResponse> {
		return this.queryBus.execute(
			new GetDocumentUploadUrlQuery(assetCode, fileName, provider, ctx.req.accessTokenJWT),
		);
	}

	@Query(() => [DMSDocumentSpanInstallationGQLModel])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async findDocumentsSpanInstallation(
		@Args('assetId') assetId: string,
		@Args('surveyId') surveyId: string,
		@Args('entityId') entityId: string,
		@Args({ name: 'provider', defaultValue: 'dms' }) provider: DocumentProvider,
		@Context() ctx: any,
	): Promise<DMSDocumentSpanInstallation[]> {
		return this.queryBus.execute(
			new FindDocumentsSpanInstallationQuery(assetId, surveyId, entityId, provider, ctx.req.accessTokenJWT),
		);
	}
}
