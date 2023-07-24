import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard, Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { DmsUploadUrlResponse } from '../../dms/types/dms-upload-upload-url-response';
import { DMSDocumentSpanInstallation } from '../../dms/types/dms-document-span-installation';

import { DocumentService } from './document.service';
import { Document } from './models/document.model';
import { DMSDocumentSpanInstallation as DMSDocumentSpanInstallationGQLModel } from './models/dms-document-span-installation';
import { FindDocumentsSpanInstallationQuery } from './queries/find-documents-span-installation.query';
import { GetDocumentUploadUrlQuery } from './queries/get-document-upload-url.query';

@Resolver((of) => Document)
@Resource(Document.name)
export class DocumentResolver {
	constructor(private documentService: DocumentService, private readonly queryBus: QueryBus) {}

	@Query(() => Document)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getDocumentUploadUrl(
		@Args('assetCode') assetCode: string,
		@Args('fileName') fileName: string,
		@Args({ name: 'provider', defaultValue: 'dms' }) provider: string,
		@Context() ctx: any,
	): Promise<DmsUploadUrlResponse> {
		return this.queryBus.execute(new GetDocumentUploadUrlQuery(assetCode, fileName, provider, ctx));
	}

	@Query(() => [DMSDocumentSpanInstallationGQLModel])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async findDocumentsSpanInstallation(
		@Args('assetId') assetId: string,
		@Args('surveyId') surveyId: string,
		@Args('entityId') entityId: string,
		@Args({ name: 'provider', defaultValue: 'dms' }) provider: string,
		@Context() ctx: any,
	): Promise<DMSDocumentSpanInstallation[]> {
		return this.queryBus.execute(
			new FindDocumentsSpanInstallationQuery(assetId, surveyId, entityId, provider, ctx),
		);
	}
}
