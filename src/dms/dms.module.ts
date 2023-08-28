/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { PrismaService } from '../prisma.service';

import { DmsRepository } from './dms.repository';

@Module({
	imports: [HttpModule],
	providers: [DmsRepository, ConfigService, PrismaService],
	exports: [DmsRepository],
})
export class DmsModule {}
