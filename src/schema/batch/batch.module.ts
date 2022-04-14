import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { BatchesResolver } from './batches.resolver';

@Module({
	providers: [PrismaService, BatchesResolver],
})
export class Batch {}
