import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { BatchRepository } from '../../schema/batch/batch.repository';
import { AssetModule } from '../../schema/asset/asset.module';
import { BatchService } from '../../schema/batch/batch.service';
import { SupportSystemService } from '../../schema/span-installation/support-system.service';
import { SupportSystemRepository } from '../../schema/span-installation/support-system.repository';
import { LuminaireRepository } from '../../schema/span-installation/luminaire.repository';
import { LuminaireService } from '../../schema/span-installation/luminaire.service';
import { MastSurveyService } from '../../schema/span-installation-survey/mast-survey.service';
import { MastSurveyRepository } from '../../schema/span-installation-survey/mast-survey.repository';
import { DocumentModule } from '../../schema/document/document.module';

import { SpanInstallationExportController } from './span-installation-export.controller';
import { SpanInstallationExportService } from './span-installation-export.service';
import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { OVSExportByBatchHandler } from './queries/ovs-export-by-batch.handler';
import { OVSExportAllHandler } from './queries/ovs-export-all.handler';
import { OVSSheetService } from './ovs-sheet.service';

@Module({
	imports: [CqrsModule, AssetModule, DocumentModule],
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
		LuminaireService,
		OVSExportByBatchHandler,
		OVSExportAllHandler,
		OVSSheetService,
		MastSurveyService,
		MastSurveyRepository,
		Logger,
	],
})
export class SpanInstallationExportModule {}
