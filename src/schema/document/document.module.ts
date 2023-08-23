/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';

import { AppService } from '../../app.service';
import { PrismaService } from '../../prisma.service';
import { DmsModule } from '../../dms/dms.module';

import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';
import { FindDocumentsSpanInstallationHandler } from './queries/find-documents-span-installation.handler';
import { GetDocumentUploadUrlHandler } from './queries/get-document-upload-url.handler';

@Module({
	imports: [CqrsModule, DmsModule],
	providers: [
		DocumentResolver,
		DocumentService,
		AppService,
		PrismaService,
		FindDocumentsSpanInstallationHandler,
		GetDocumentUploadUrlHandler,
	],
	exports: [DocumentService],
})
export class DocumentModule {}
