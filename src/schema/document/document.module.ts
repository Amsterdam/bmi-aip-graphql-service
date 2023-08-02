/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';

import { AppService } from '../../app.service';
import { DmsRepository } from '../../dms/dms.repository';
import { PrismaService } from '../../prisma.service';

import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';
import { FindDocumentsSpanInstallationHandler } from './queries/find-documents-span-installation.handler';
import { GetDocumentUploadUrlHandler } from './queries/get-document-upload-url.handler';

@Module({
	imports: [HttpModule, CqrsModule],
	providers: [
		DocumentResolver,
		DocumentService,
		DmsRepository,
		AppService,
		PrismaService,
		FindDocumentsSpanInstallationHandler,
		GetDocumentUploadUrlHandler,
	],
	exports: [],
})
export class DocumentModule {}
