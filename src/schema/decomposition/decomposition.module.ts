import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AssetModule } from '../asset/asset.module';
import { PrismaService } from '../../prisma.service';

import { ElementService } from './element.service';
import { ElementResolver } from './element.resolver';
import { ManifestationResolver } from './manifestation.resolver';
import { CreateManifestationHandler } from './commands/create-manifestation.handler';
import { ManifestationRepository } from './manifestation.repository';
import { ManifestationService } from './manifestation.service';
import { UnitResolver } from './unit.resolver';
import { CreateUnitHandler } from './commands/create-unit.handler';
import { UnitRepository } from './unit.repository';
import { UnitService } from './unit.service';
import { CreateElementHandler } from './commands/create-element.handler';
import { ElementRepository } from './element.repository';
import { UpdateElementHandler } from './commands/update-element.handler';

@Module({
	providers: [
		ElementResolver,
		ElementService,
		ElementRepository,
		UnitResolver,
		UnitRepository,
		UnitService,
		ManifestationResolver,
		ManifestationRepository,
		ManifestationService,
		CreateElementHandler,
		CreateUnitHandler,
		CreateManifestationHandler,
		UpdateElementHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class DecompositionModule {}
