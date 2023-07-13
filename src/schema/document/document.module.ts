/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppService } from '../../app.service';
import { DmsRepository } from '../../dms/dms.repository';
import { PrismaService } from '../../prisma.service';

import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';

@Module({
	imports: [HttpModule],
	providers: [DocumentResolver, DocumentService, DmsRepository, AppService, PrismaService],
	exports: [],
})
export class DocumentModule {}
