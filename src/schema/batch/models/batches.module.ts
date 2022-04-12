import { Module } from '@nestjs/common';

import { BatchesResolver } from '../batches.resolver';
import { BatchesService } from '../batches.service';
import { PrismaService } from '../../../prisma.service';

@Module({
	providers: [PrismaService, BatchesResolver, BatchesService],
})
export class BatchesModule {}
