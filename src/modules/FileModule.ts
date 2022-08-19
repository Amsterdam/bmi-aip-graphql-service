import { Module, CacheModule, Logger } from '@nestjs/common';
import { FileWriterService } from 'src/services/FileWriterService';
import { ConsoleModule } from 'nestjs-console';
import { ConfigService } from '@nestjs/config';
import { GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { Reflector } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

import { ObjectService } from '../schema/object/object.service';
import { ObjectRepository } from '../schema/object/object.repository';
import { PrismaService } from '../prisma.service';

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
	providers: [FileWriterService, Logger, ConfigService, ObjectService, ObjectRepository, PrismaService],
})
export class FileModule {}
