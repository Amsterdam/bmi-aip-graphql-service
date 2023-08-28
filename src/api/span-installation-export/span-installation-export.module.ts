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
import { JunctionBoxService } from '../../schema/span-installation/junction-box.service';
import { JunctionBoxRepository } from '../../schema/span-installation/junction-box.repository';
import { MastSurveyService } from '../../schema/span-installation-survey/mast-survey.service';
import { MastSurveyRepository } from '../../schema/span-installation-survey/mast-survey.repository';
import { FacadeSurveyService } from '../../schema/span-installation-survey/facade-survey.service';
import { FacadeSurveyRepository } from '../../schema/span-installation-survey/facade-survey.repository';
import { TensionWireSurveyService } from '../../schema/span-installation-survey/tension-wire-survey.service';
import { LuminaireSurveyService } from '../../schema/span-installation-survey/luminaire-survey.service';
import { NodeSurveyService } from '../../schema/span-installation-survey/node-survey.service';
import { TensionWireSurveyRepository } from '../../schema/span-installation-survey/tension-wire-survey.repository';
import { LuminaireSurveyRepository } from '../../schema/span-installation-survey/luminaire-survey.repository';
import { NodeSurveyRepository } from '../../schema/span-installation-survey/node-survey.repository';
import { DocumentModule } from '../../schema/document/document.module';

import { SpanInstallationExportController } from './span-installation-export.controller';
import { SpanInstallationExportService } from './span-installation-export.service';
import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { OVSExportByBatchHandler } from './queries/ovs-export-by-batch.handler';
import { OVSExportAllHandler } from './queries/ovs-export-all.handler';
import { OVSSheetService } from './ovs-sheet.service';
import { OVSExportByObjectHandler } from './queries/ovs-export-by-object.handler';

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
		JunctionBoxService,
		JunctionBoxRepository,
		OVSExportByBatchHandler,
		OVSExportByObjectHandler,
		OVSExportAllHandler,
		OVSSheetService,
		MastSurveyService,
		MastSurveyRepository,
		FacadeSurveyService,
		FacadeSurveyRepository,
		TensionWireSurveyService,
		TensionWireSurveyRepository,
		LuminaireSurveyService,
		LuminaireSurveyRepository,
		NodeSurveyService,
		NodeSurveyRepository,
		Logger,
	],
})
export class SpanInstallationExportModule {}
