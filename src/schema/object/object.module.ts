import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';

import { ObjectRepository } from './object.repository';
import { ObjectService } from './object.service';
import { ObjectResolver } from './object.resolver';
import { CreateObjectsCommand } from './commands/create-objects.command';
import { CreateObjectsHandler } from './commands/create-objects.handler';

@Module({
	providers: [
		ObjectResolver,
		ObjectRepository,
		ObjectService,
		PrismaService,
		CreateObjectsCommand,
		CreateObjectsHandler,
	],
	exports: [ObjectService],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => ObjectModule)],
})
export class ObjectModule {}
