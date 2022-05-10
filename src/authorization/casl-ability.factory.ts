import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AbilityOptionsOf } from '@casl/ability/dist/types/PureAbility';

import { UserRepository } from '../schema/user/user.repository';
import { AssetRepository } from '../schema/asset/asset.repository';
import { Asset } from '../schema/asset/models/asset.model';

import { userHasRole } from './utils';
import { Action, UserFromToken, Roles } from './types';

const assetCode = Prisma.validator<Prisma.objectsArgs>()({
	select: { code: true },
});

export type AssetCode = Prisma.objectsGetPayload<typeof assetCode>;
export type Subjects = AssetCode | InferSubjects<typeof Asset> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

export const buildOptions: AbilityOptionsOf<Ability<[Action, Subjects]>> = {
	detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
};

export const constructAppAbility = () =>
	new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

@Injectable()
export class CaslAbilityFactory {
	constructor(private readonly userRepo: UserRepository, private readonly assetRepo: AssetRepository) {}

	async createForUser(user: UserFromToken) {
		const { can, build } = constructAppAbility();

		can(Action.Read, 'all');

		if (userHasRole(user, Roles.aip_owner)) {
			can(Action.Write, 'all');
		} else {
			const { companyId } = await this.userRepo.getUserByEmail(user.email);
			const writableAssetCodes = await this.assetRepo.getWritableAssetCodesForCompanyId(companyId);
			writableAssetCodes.forEach((code) => can(Action.Write, Asset, { code }));
		}

		return build(buildOptions);
	}
}
