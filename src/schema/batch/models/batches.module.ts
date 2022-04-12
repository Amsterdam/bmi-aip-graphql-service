import { Module } from '@nestjs/common';

import { BatchesResolver } from '../batches.resolver';
import { PrismaService } from '../../../prisma.service';

@Module({
	providers: [PrismaService, BatchesResolver],
})
export class BatchesModule {}
