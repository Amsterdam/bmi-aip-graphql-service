import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { BatchRepository } from '../../schema/batch/batch.repository';

import { SpanInstallationExportController } from './span-installation-export.controller';
import { SpanInstallationExportService } from './span-installation-export.service';
import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { ExportBatchDataHandler } from './queries/export-batch-data.handler';
import { ExportAllDataHandler } from './queries/export-all-data.handler';

@Module({
	imports: [CqrsModule],
	controllers: [SpanInstallationExportController],
	providers: [
		PrismaService,
		SpanInstallationExportService,
		SpanInstallationExportRepository,
		BatchRepository,
		ExportBatchDataHandler,
		ExportAllDataHandler,
	],
})
export class SpanInstallationExportModule {}
