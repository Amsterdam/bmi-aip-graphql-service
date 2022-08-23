import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AssetModule } from '../asset/asset.module';
import { PrismaService } from '../../prisma.service';

import { JunctionBoxResolver } from './junction-box-resolver';
import { JunctionBoxService } from './junction-box.service';
import { JunctionBoxRepository } from './junction-box.repository';
import { CreateJunctionBoxHandler } from './commands/create-junction-box.handler';
import { UpdateJunctionBoxHandler } from './commands/update-junction-box.handler';
import { DeleteJunctionBoxHandler } from './commands/delete-junction-box.handler';
import { SupportSystemRepository } from './support-system.repository';
import { SupportSystemResolver } from './support-system.resolver';
import { SupportSystemService } from './support-system.service';
import { DeleteSupportSystemHandler } from './commands/delete-support-system.handler';
import { UpdateSupportSystemHandler } from './commands/update-support-system.handler';
import { CreateSupportSystemHandler } from './commands/create-support-system.handler';
import { CreateLuminaireHandler } from './commands/create-luminaire.handler';
import { UpdateLuminaireHandler } from './commands/update-luminaire.handler';
import { LuminaireResolver } from './luminaire.resolver';
import { LuminaireRepository } from './luminaire.repository';
import { LuminaireService } from './luminaire.service';
import { DeleteLuminaireHandler } from './commands/delete-luminaire.handler';
import { FindSupportSystemsHandler } from './queries/find-support-systems.handler';

@Module({
	providers: [
		JunctionBoxResolver,
		JunctionBoxService,
		JunctionBoxRepository,
		CreateJunctionBoxHandler,
		UpdateJunctionBoxHandler,
		DeleteJunctionBoxHandler,
		SupportSystemResolver,
		SupportSystemService,
		SupportSystemRepository,
		CreateSupportSystemHandler,
		UpdateSupportSystemHandler,
		DeleteSupportSystemHandler,
		LuminaireResolver,
		LuminaireService,
		LuminaireRepository,
		CreateLuminaireHandler,
		UpdateLuminaireHandler,
		DeleteLuminaireHandler,
		FindSupportSystemsHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class SpanInstallationModule {}
