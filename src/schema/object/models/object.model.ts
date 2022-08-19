import { Field } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';

export class AssetObject {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	name: string;

	@Field((type) => String, { nullable: true })
	code?: string;

	@Field((type) => String, { nullable: true })
	location?: string;

	@Field((type) => Decimal, { nullable: true })
	public latitude?: Decimal;

	@Field((type) => Decimal, { nullable: true })
	public longitude?: Decimal;

	@Field((type) => String, { nullable: true })
	public updatedOn: string;

	@Field((type) => Boolean)
	public compositionIsVisible: boolean;

	@Field((type) => String, { nullable: true })
	public clientCompanyId: string;

	@Field((type) => String, { nullable: true })
	public operatorCompanyId: string;

	@Field((type) => String, { nullable: true })
	public surveyorCompanyId: string;

	@Field((type) => String, { nullable: false })
	public objectTypeId: string;

	@Field((type) => String, { nullable: true })
	public created_at: string;

	@Field((type) => String, { nullable: true })
	public updated_at: string;

	@Field((type) => String, { nullable: true })
	public inspectionStandardId: string;

	@Field((type) => String, { nullable: true })
	public ownerCompanyId: string;

	@Field((type) => String, { nullable: true })
	public customerVersion: string;

	@Field((type) => Boolean)
	public isPublic: boolean;

	@Field((type) => Boolean)
	public isDemo: boolean;

	@Field((type) => String, { nullable: true })
	public siteId: string;

	@Field((type) => Number, { nullable: true })
	public constructionYear: number;

	@Field((type) => String, { nullable: true })
	public externalRefId: string;

	@Field((type) => String, { nullable: true })
	public useage: string;

	@Field((type) => String, { nullable: true })
	public managementOrganization: string;

	@Field((type) => String, { nullable: true })
	public shape: string;

	@Field((type) => Number, { nullable: true })
	public shapeSrid: number;

	@Field((type) => String, { nullable: true })
	public status: string;

	@Field((type) => String, { nullable: true })
	public effortCategory: string;

	@Field((type) => Number, { nullable: true })
	public effortCalculation: number;

	@Field((type) => String, { nullable: true })
	public trafficType: string;

	@Field((type) => String, { nullable: true })
	public mainMaterial: string;

	@Field((type) => String, { nullable: true })
	public marineInfrastrutureType: string;

	@Field((type) => Decimal, { nullable: true })
	public length?: Decimal;

	@Field((type) => Decimal, { nullable: true })
	public width?: Decimal;

	@Field((type) => Decimal, { nullable: true })
	public squareMeters?: Decimal;

	@Field((type) => JSON, { nullable: true })
	public attributes: Prisma.JsonValue;
}
