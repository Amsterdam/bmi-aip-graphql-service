import { forwardRef, Module } from '@nestjs/common';

import { AssetModule } from '../schema/asset/asset.module';
import { UserModule } from '../schema/user/user.module';
import { UserRepository } from '../schema/user/user.repository';
import { AssetRepository } from '../schema/asset/asset.repository';
import { PrismaService } from '../prisma.service';

import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
	providers: [CaslAbilityFactory, UserRepository, AssetRepository, PrismaService],
	exports: [CaslAbilityFactory],
	imports: [forwardRef(() => UserModule), forwardRef(() => AssetModule)],
})
export class AuthorizationModule {}
