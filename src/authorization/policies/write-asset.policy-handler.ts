import { subject } from '@casl/ability';
import { BadRequestException } from '@nestjs/common';
import { Action, IPolicyHandler } from '../types';
import { AppAbility } from '../casl-ability.factory';
import { Request } from 'express';
import { AssetFactory } from '../../schema/asset/asset.factory';

export class WriteAssetPolicyHandler implements IPolicyHandler {
	handle(ability: AppAbility, request: Request, args: Record<string, unknown> & { code: string }) {
		const { code } = args;

		if (!code) throw new BadRequestException('Missing asset `code` argument in query/request');

		if (ability.can(Action.Write, 'all')) return true;

		return ability.can(Action.Write, AssetFactory.FromCode(code));
	}
}
