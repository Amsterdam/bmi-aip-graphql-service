import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';

import { AssetService } from './asset.service';
import { AssetRepository } from './asset.repository';
import { CreateAssetHandler } from './commands/create-asset.handler';
import { UpdateAssetHandler } from './commands/update-asset.handler';
import { CreateAssetCommand } from './commands/create-asset.command';
import { UpdateAssetCommand } from './commands/update-asset.command';
import { AssetResolver } from './asset.resolver';
import { UpdatePassportByObjectCodeCommand } from './commands/update-passport-by-objectCode.command';
import { UpdatePassportByObjectCodeHandler } from './commands/update-passport-by-objectCode.handler';

@Module({
	providers: [
		AssetResolver,
		AssetService,
		AssetRepository,
		PrismaService,
		CreateAssetCommand,
		CreateAssetHandler,
		UpdateAssetCommand,
		UpdateAssetHandler,
		UpdatePassportByObjectCodeCommand,
		UpdatePassportByObjectCodeHandler,
	],
	imports: [CqrsModule, forwardRef(() => AuthorizationModule), AuthenticationModule],
	exports: [AssetService],
})
export class AssetModule {}
