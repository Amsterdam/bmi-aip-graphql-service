import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

import { buildOptions, constructAppAbility } from '../casl-ability.factory';
import { Asset } from '../../schema/asset/models/asset.model';
import { Action } from '../types';

import { WriteAssetPolicyHandler } from './write-asset.policy-handler';

describe('WriteAssetPolicyHandler', () => {
	test('Always returns true if user is owner', () => {
		const { can, build } = constructAppAbility();
		can(Action.Write, 'all');
		const ability = build(buildOptions);
		expect(new WriteAssetPolicyHandler().handle(ability, {} as Request, { code: 'BRU001' })).toBe(true);
	});

	test('Returns true if user has explicit write permissions on Asset code', () => {
		const { can, build } = constructAppAbility();
		can(Action.Write, Asset, { code: 'BRU001' });
		const ability = build(buildOptions);
		expect(new WriteAssetPolicyHandler().handle(ability, {} as Request, { code: 'BRU001' })).toBe(true);
	});

	test('Returns false if user does NOT have explicit write permissions on Asset code', () => {
		const { can, build } = constructAppAbility();
		can(Action.Write, Asset, { code: 'BRU002' });
		const ability = build(buildOptions);
		expect(new WriteAssetPolicyHandler().handle(ability, {} as Request, { code: 'BRU001' })).toBe(false);
	});

	test('Throws an exception if code is missing', () => {
		const { can, build } = constructAppAbility();
		can(Action.Write, Asset, { code: 'BRU001' });
		const ability = build(buildOptions);
		// @ts-ignore
		expect(() => new WriteAssetPolicyHandler().handle(ability, {} as Request, {})).toThrow(BadRequestException);
	});
});
