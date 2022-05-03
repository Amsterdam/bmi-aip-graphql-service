import { MockedObjectDeep } from 'ts-jest';
import { UserRepository } from '../schema/user/user.repository';
import { AssetRepository } from '../schema/asset/asset.repository';
import { CaslAbilityFactory } from './casl-ability.factory';
import { Action, UserFromToken, Roles } from './types';

import { user } from '../schema/user/__stubs__/user';
import { loggedInUser } from '../authentication/__stubs__/loggedInUser';
import { Asset } from '../schema/asset/asset.model';

const userRepositoryMock: MockedObjectDeep<UserRepository> = {
	getUserByEmail: jest.fn().mockResolvedValue(user),
	...(<any>{}),
};
const assetRepositoryMock: MockedObjectDeep<AssetRepository> = {
	getWritableAssetCodesForCompanyId: jest.fn().mockResolvedValue(['BRU001', 'BRU002']),
	...(<any>{}),
};

const constructAbility = async (kcUser: UserFromToken = loggedInUser) => {
	const factory = new CaslAbilityFactory(userRepositoryMock, assetRepositoryMock);
	return factory.createForUser(kcUser);
};

describe('CaslAbilityFactory', () => {
	describe('Owners can do', () => {
		test('all the things', async () => {
			const ability = await constructAbility();
			expect(ability.can(Action.Read, 'all')).toBe(true);
			expect(ability.can(Action.Write, 'all')).toBe(true);
		});
	});

	describe('Other users can (regardless of role)', () => {
		let ability;
		beforeAll(async () => {
			ability = await constructAbility({ ...loggedInUser, realm_access: { roles: [Roles.aip_survey] } });
		});

		test('read all assets', async () => {
			expect(ability.can(Action.Read, 'all')).toBe(true);
		});

		test('write BRU001', async () => {
			const asset = new Asset();
			asset.code = 'BRU001';
			expect(ability.can(Action.Write, asset)).toBe(true);
		});

		test('NOT write BRU003', async () => {
			const asset = new Asset();
			asset.code = 'BRU003';
			expect(ability.can(Action.Write, asset)).toBe(false);
		});
	});
});
