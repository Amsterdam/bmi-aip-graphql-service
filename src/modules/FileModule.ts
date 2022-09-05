import { Module, CacheModule, Logger } from '@nestjs/common';
import { FileWriterService } from 'src/services/FileWriterService';
import { ConsoleModule } from 'nestjs-console';
import { ConfigService } from '@nestjs/config';
import { GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { Reflector } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

import { ObjectRepository } from '../schema/object/object.repository';
import { PrismaService } from '../prisma.service';
import { SurveyRepository } from '../schema/survey/survey.repository';
import { JunctionBoxRepository } from '../schema/span-installation/junction-box.repository';
import { SupportSystemRepository } from '../schema/span-installation/support-system.repository';
import { LuminaireRepository } from '../schema/span-installation/luminaire.repository';
import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';
import { UndoOVSImportService } from '../services/UndoOVSImportService';

@Module({
	imports: [
		ConsoleModule,
		HttpModule,
		CacheModule.register(),
		GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
			useFactory: (configService: ConfigService) => ({
				endpoint: configService.get<string>('AIP_REMOTE_URL'),
				options: {
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${configService.get<string>('AIP_REMOTE_TOKEN')}`,
					},
				},
			}),
			inject: [ConfigService, Reflector],
		}),
	],
	providers: [
		FileWriterService,
		UndoOVSImportService,
		Logger,
		ConfigService,
		ObjectRepository,
		PrismaService,
		SurveyRepository,
		JunctionBoxRepository,
		SupportSystemRepository,
		LuminaireRepository,
		ExternalAIPGraphQLRepository,
	],
})
export class FileModule {}
