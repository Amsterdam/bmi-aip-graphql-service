import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UserRepository } from '../schema/user/user.repository';
import { AssetRepository } from '../schema/asset/asset.repository';
import { Asset } from '../schema/asset/asset.model';

import { userHasRole } from './utils';
import { Action, UserFromToken, Roles } from './types';

const assetCode = Prisma.validator<Prisma.objectsArgs>()({
	select: { code: true },
});
export type AssetCode = Prisma.objectsGetPayload<typeof assetCode>;

type Subjects = AssetCode | InferSubjects<typeof Asset> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
	constructor(private readonly userRepo: UserRepository, private readonly assetRepo: AssetRepository) {}

	async createForUser(user: UserFromToken) {
		const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

		can(Action.Read, 'all');

		if (userHasRole(user, Roles.aip_owner)) {
			can(Action.Write, 'all');
		} else {
			const { companyId } = await this.userRepo.getUserByEmail(user.email);
			const writableAssetCodes = await this.assetRepo.getWritableAssetCodesForCompanyId(companyId);
			writableAssetCodes.forEach((code) => can(Action.Write, Asset, { code }));
			can(Action.Write, Asset, { code: 'BRU001' });
		}

		return build({
			// Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
			detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
		});
	}
}
