import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AssetModule } from '../asset/asset.module';
import { PrismaService } from '../../prisma.service';

import { ElementsService } from './elements.service';
import { ElementsResolver } from './elements.resolver';
import { ManifestationResolver } from './manifestation.resolver';
import { CreateManifestationHandler } from './commands/create-manifestation.handler';
import { ManifestationRepository } from './manifestation.repository';
import { ManifestationService } from './manifestation.service';

@Module({
	providers: [
		ElementsResolver,
		ElementsService,
		ManifestationResolver,
		ManifestationRepository,
		ManifestationService,
		CreateManifestationHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class DecompositionModule {}
