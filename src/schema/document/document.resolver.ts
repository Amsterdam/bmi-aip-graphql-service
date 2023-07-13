import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard, Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { UseGuards } from '@nestjs/common';

import { DmsUploadUrlResponse } from '../../dms/types/dms-upload-upload-url-response';

import { DocumentService } from './document.service';
import { Document } from './models/document.model';

@Resolver((of) => Document)
@Resource(Document.name)
export class DocumentResolver {
	constructor(private documentService: DocumentService) {}

	@Query(() => Document)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getDocumentUploadUrl(
		@Args('assetCode') assetCode: string,
		@Args('fileName') fileName: string,
		@Args({ name: 'provider', defaultValue: 'dms' }) provider: string,
		@Context() ctx: any,
	): Promise<DmsUploadUrlResponse> {
		return this.documentService.getDocumentUploadUrl(assetCode, fileName, provider, ctx);
	}
}
