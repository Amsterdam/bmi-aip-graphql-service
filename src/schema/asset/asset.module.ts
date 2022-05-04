import { Module } from '@nestjs/common';

// import { CaslModule } from 'nest-casl';
// import { permissions } from './casl/asset.permissions';
import { PrismaService } from '../../prisma.service';

import { AssetService } from './asset.service';
import { AssetRepository } from './asset.repository';

@Module({
	providers: [AssetService, AssetRepository, PrismaService],
	// imports: [CaslModule.forFeature({ permissions })],
	exports: [AssetService],
})
export class AssetModule {}
