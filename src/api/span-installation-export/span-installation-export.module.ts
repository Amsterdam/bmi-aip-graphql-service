import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { BatchRepository } from '../../schema/batch/batch.repository';
import { AssetModule } from '../../schema/asset/asset.module';
import { BatchService } from '../../schema/batch/batch.service';
import { SupportSystemService } from '../../schema/span-installation/support-system.service';
import { SupportSystemRepository } from '../../schema/span-installation/support-system.repository';
import { LuminaireRepository } from '../../schema/span-installation/luminaire.repository';

import { SpanInstallationExportController } from './span-installation-export.controller';
import { SpanInstallationExportService } from './span-installation-export.service';
import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { OVSExportByBatchHandler } from './queries/ovs-export-by-batch.handler';
import { OVSExportAllHandler } from './queries/ovs-export-all.handler';
import { AddOVSSheetService } from './add-ovs-sheet.service';

@Module({
	imports: [CqrsModule, AssetModule],
	controllers: [SpanInstallationExportController],
	providers: [
		PrismaService,
		SpanInstallationExportService,
		SpanInstallationExportRepository,
		BatchRepository,
		BatchService,
		SupportSystemService,
		SupportSystemRepository,
		LuminaireRepository,
		OVSExportByBatchHandler,
		OVSExportAllHandler,
		AddOVSSheetService,
		Logger,
	],
})
export class SpanInstallationExportModule {}
