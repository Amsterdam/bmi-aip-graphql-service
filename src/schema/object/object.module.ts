import { forwardRef, Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';

import { ObjectRepository } from './object.repository';
import { ObjectService } from './object.service';
import { ObjectResolver } from './object.resolver';
import { CreateObjectCommand } from './commands/create-object.command';
import { CreateObjectHandler } from './commands/create-object.handler';
import { UndoOVSImportCommand } from './commands/undo-ovs-import.command';
import { UndoOVSImportHandler } from './commands/undo-ovs-import.handler';
import { RemoveDuplicateInstallationGroupHandler } from './commands/remove-duplicate-installation-group.handler';

@Module({
	providers: [
		ObjectResolver,
		ObjectRepository,
		ObjectService,
		PrismaService,
		CreateObjectCommand,
		CreateObjectHandler,
		UndoOVSImportCommand,
		UndoOVSImportHandler,
		RemoveDuplicateInstallationGroupHandler,
		Logger,
	],
	exports: [ObjectService],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => ObjectModule)],
})
export class ObjectModule {}
