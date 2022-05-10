import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import type { IAssetRepository } from './types/asset.repository.interface';

const assetCode = Prisma.validator<Prisma.objectsArgs>()({
	select: { code: true },
});
export type AssetCode = Prisma.objectsGetPayload<typeof assetCode>;

const asset = Prisma.validator<Prisma.objectsArgs>()({});
export type DBAsset = Prisma.objectsGetPayload<typeof asset>;

@Injectable()
export class AssetRepository implements IAssetRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async getWritableAssetCodesForCompanyId(companyId: string): Promise<string[]> {
		const codes = await this.prisma.$queryRaw<AssetCode[]>`
			SELECT "objects"."code" FROM "objects"
			WHERE
				NOT "objects"."status" = 'deleted'
				and EXISTS (
					SELECT "batches".id FROM "batches"
					WHERE (
						"batches"."status" = 'open'
						OR "batches"."status" = 'active'
					)
					AND EXISTS (
						SELECT "batchObjects".id FROM "batchObjects"
						WHERE
							objects.id = "batchObjects"."objectId"
							AND batches.id = "batchObjects"."batchId"
					)
					AND EXISTS (
						SELECT "batchExecutorCompanies".id FROM "batchExecutorCompanies"
						WHERE
							batches.id = "batchExecutorCompanies"."batchId"
							AND "batchExecutorCompanies"."companyId" = ${companyId}
					)
				)
		`;
		return codes.map(({ code }) => code);
	}

	public async getAssetByCode(code: string): Promise<DBAsset> {
		const dbAsset = await this.prisma.objects.findFirst({ where: { code } });
		if (!dbAsset) {
			throw new NotFoundException(`Unable to find asset with code: ${code}`);
		}
		return dbAsset;
	}
}
