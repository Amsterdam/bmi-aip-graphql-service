import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
// import { ConsoleModule } from 'nestjs-console';
// import { HttpModule } from '@nestjs/axios';

import { SpanInstallationExportController } from './span-installation-export.controller';
import { SpanInstallationExportService } from './span-installation-export.service';

@Module({
	imports: [CqrsModule],
	controllers: [SpanInstallationExportController],
	providers: [SpanInstallationExportService],
})
export class SpanInstallationExportModule {}
