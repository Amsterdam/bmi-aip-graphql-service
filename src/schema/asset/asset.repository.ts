import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import type { IAssetRepository } from './types/asset.repository.interface';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';
import { AssetAttributesInput } from './dto/asset-attributes.input';

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

	async createAsset(input: CreateAssetInput): Promise<DBAsset> {
		const data: Prisma.objectsCreateInput = {
			id: newId(),
			name: input.name,
			code: input.code,
			location: input.location,
			updatedOn: input.updatedOn,
			attributes: input.attributes,
			status: input.status,
			companies_companiesToobjects_clientCompanyId: {
				connect: {
					id: input.clientCompanyId,
				},
			},
			customerVersion: input.customerVersion,
			inspectionStandards: {
				connect: {
					id: input.inspectionStandardId,
				},
			},
			compositionIsVisible: false,
			objectTypes: {
				connect: {
					id: input.objectTypeId,
				},
			},
		};

		return this.prisma.objects.create({ data });
	}

	async updateAsset(input: UpdateAssetInput): Promise<DBAsset> {
		const id = input.id;
		const data: Prisma.objectsUpdateInput = {
			name: input.name,
			code: input.code,
			location: input.location,
			updatedOn: input.updatedOn,
			attributes: JSON.stringify(input.attributes),
			status: input.status,
			companies_companiesToobjects_clientCompanyId: {
				connect: {
					id: input.clientCompanyId,
				},
			},
			customerVersion: input.customerVersion,
			inspectionStandards: {
				connect: {
					id: input.inspectionStandardId,
				},
			},
			compositionIsVisible: input.compositionIsVisible,
			objectTypes: {
				connect: {
					id: input.objectTypeId,
				},
			},
			latitude: input.latitude,
			longitude: input.longitude,
			companies_companiesToobjects_ownerCompanyId: {
				connect: {
					id: input.ownerCompanyId,
				},
			},
			companies_companiesToobjects_operatorCompanyId: {
				connect: {
					id: input.operatorCompanyId,
				},
			},
			companies_companiesToobjects_surveyorCompanyId: {
				connect: {
					id: input.surveyorCompanyId,
				},
			},
			isPublic: input.isPublic,
			isDemo: input.isDemo,
			sites: {
				connect: {
					id: input.siteId,
				},
			},
			constructionYear: input.constructionYear,
			externalRefId: input.externalRefId,
			useage: input.useage,
			managementOrganization: input.managementOrganization,
			shapeSrid: input.shapeSrid,
			effortCategory: input.effortCategory,
			effortCalculation: input.effortCalculation,
			trafficType: input.trafficType,
			mainMaterial: input.mainMaterial,
			marineInfrastrutureType: input.marineInfrastrutureType,
			length: input.length,
			width: input.width,
			squareMeters: input.squareMeters,
		};

		return this.prisma.objects.update({
			where: { id },
			data,
		});
	}

	async updateAssetPassportByObjectCode(input: AssetAttributesInput): Promise<DBAsset> {
		const id = input.assetId;

		const data: Prisma.objectsUpdateInput = {
			attributes: JSON.parse(JSON.stringify(input.attributes)), //JSON.stringify(input.attributes),
		};

		return this.prisma.objects.update({
			where: { id },
			data,
		});
	}
}
