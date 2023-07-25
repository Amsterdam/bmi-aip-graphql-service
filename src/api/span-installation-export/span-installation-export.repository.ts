import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { Asset } from '../../schema/asset/models/asset.model';

@Injectable()
export class SpanInstallationExportRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async findSpanInstallations(): Promise<[]> {
		return [];
	}
}
