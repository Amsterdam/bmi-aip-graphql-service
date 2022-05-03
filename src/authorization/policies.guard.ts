import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { UserFromToken, PolicyHandler } from './types';
import { CHECK_POLICIES_KEY } from './check-policies.decorator';
import { extractRequest, extractArgs } from '../utils';

@Injectable()
export class PoliciesGuard implements CanActivate {
	constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		// const ctx = context.switchToHttp();
		// const request = ctx.getRequest<Request>();

		const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
		const request = extractRequest(context);
		const args = extractArgs(context);

		console.log('__ARGS__', args);

		// console.log(':: request', request);

		// const { user } = context.switchToHttp().getRequest();
		// console.log('// args', request);
		console.log('canActivate()', request.user.email);
		const { user } = request;
		const ability = await this.caslAbilityFactory.createForUser(user as UserFromToken);

		// let ability = request?.ability;
		// if (!ability) {
		// 	console.log('ABILITY INIT ------');
		// 	ability = await this.caslAbilityFactory.createForUser(user as UserFromToken);
		// 	request.ability = ability;
		// }

		// console.log('__ request.ability', request.ability);
		// const ability = request?.ability ?? (await this.caslAbilityFactory.createForUser(user as UserFromToken));
		// request.ability = ability;

		return policyHandlers.every((handler) => PoliciesGuard.execPolicyHandler(handler, ability, request, args));
	}

	static execPolicyHandler(
		handler: PolicyHandler,
		ability: AppAbility,
		request: Request,
		args: Record<string, unknown>,
	) {
		return typeof handler === 'function' ? handler(ability, request, args) : handler.handle(ability, request, args);
	}
}
