import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { AssetService } from './asset.service';
import { AssetRepository } from './asset.repository';

@Module({
	providers: [AssetService, AssetRepository, PrismaService],
	exports: [AssetService],
})
export class AssetModule {}
