import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { extractRequest, extractArgs } from '../utils';

import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { UserFromToken, PolicyHandler } from './types';
import { CHECK_POLICIES_KEY } from './check-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
	constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = extractRequest(context);
		const args = extractArgs(context);

		const { user } = request;
		const ability = await this.caslAbilityFactory.createForUser(user as UserFromToken);

		const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
		return policyHandlers.every((handler) => PoliciesGuard.ExecPolicyHandler(handler, ability, request, args));
	}

	static ExecPolicyHandler(
		handler: PolicyHandler,
		ability: AppAbility,
		request: Request,
		args: Record<string, unknown>,
	) {
		return typeof handler === 'function' ? handler(ability, request, args) : handler.handle(ability, request, args);
	}
}
