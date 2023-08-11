import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { BatchRepository } from '../../schema/batch/batch.repository';
import { AssetModule } from '../../schema/asset/asset.module';

import { SpanInstallationExportController } from './span-installation-export.controller';
import { SpanInstallationExportService } from './span-installation-export.service';
import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { OVSExportByBatchHandler } from './queries/ovs-export-by-batch.handler';
import { OVSExportAllHandler } from './queries/ovs-export-all.handler';
import { AddOVSSheetService } from './add-ovs-sheet.service';
import { OVSDataService } from './ovs-data.service';

@Module({
	imports: [CqrsModule, AssetModule],
	controllers: [SpanInstallationExportController],
	providers: [
		PrismaService,
		SpanInstallationExportService,
		SpanInstallationExportRepository,
		BatchRepository,
		OVSExportByBatchHandler,
		OVSExportAllHandler,
		OVSDataService,
		AddOVSSheetService,
		Logger,
	],
})
export class SpanInstallationExportModule {}
