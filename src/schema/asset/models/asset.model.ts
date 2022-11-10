import { Field, ObjectType } from '@nestjs/graphql';

import { AssetStatuses } from '../../../types';
import { Batch } from '../../batch/models/batch.model';

import { IPassport } from './passport.model';

@ObjectType({ description: 'asset' })
export class Asset {
	@Field((type) => String)
	public id: string;

	@Field((type) => String)
	public gisibId: number;

	@Field((type) => String)
	public name: string;

	@Field((type) => String, { nullable: true })
	public code: string;

	@Field((type) => String, { nullable: true })
	public location: string;

	@Field((type) => Number, { nullable: true })
	public latitude: number;

	@Field((type) => Number, { nullable: true })
	public longitude: number;

	@Field((type) => String, { nullable: true })
	public updatedOn: string;

	@Field((type) => Boolean)
	public compositionIsVisible: boolean;

	@Field((type) => String, { nullable: true })
	public clientCompanyId: string;

	@Field((type) => String, { nullable: true })
	public operatorCompanyId: string;

	@Field((type) => String, { nullable: true })
	public status: keyof typeof AssetStatuses | null;

	@Field((type) => String)
	public ownerCompanyId: string;

	@Field((type) => String)
	public objectTypeId: string;

	@Field((type) => String, { nullable: true })
	public inspectionStandardId: string;

	@Field((type) => String, { nullable: true })
	public created_at: string;

	@Field((type) => String, { nullable: true })
	public updated_at: string;

	@Field((type) => String, { nullable: true })
	public customerVersion: string;

	@Field((type) => String, { nullable: true })
	public externalRefId: string;

	@Field((type) => String, { nullable: true })
	public managementOrganization: string;

	@Field((type) => String, { nullable: true })
	public shape: string;

	@Field((type) => String, { nullable: true })
	public useage: string;

	@Field((type) => String, { nullable: true })
	public siteId: string;

	@Field((type) => String)
	public surveyorCompanyId: string;

	@Field((type) => Boolean, { nullable: true })
	public isPublic: boolean;

	@Field((type) => Boolean, { nullable: true })
	public isDemo: boolean;

	@Field((type) => Number, { nullable: true })
	public constructionYear: number;

	@Field((type) => Number, { nullable: true })
	public shapeSrid: number;

	@Field((type) => String, { nullable: true })
	public effortCategory: string;

	@Field((type) => Number, { nullable: true })
	public effortCalculation: number;

	@Field((type) => Number, { nullable: true })
	public length: number;

	@Field((type) => Number, { nullable: true })
	public width: number;

	@Field((type) => Number, { nullable: true })
	public squareMeters: number;

	@Field((type) => String, { nullable: true })
	public trafficType: string;

	@Field((type) => String, { nullable: true })
	public mainMaterial: string;

	@Field((type) => String, { nullable: true })
	public marineInfrastrutureType: string;

	@Field((type) => String || IPassport, { nullable: true })
	public attributes: string | IPassport;

	@Field((type) => [Batch])
	batches?: Batch[];
}
