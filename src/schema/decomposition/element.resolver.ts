import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, Roles } from 'nest-keycloak-connect';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { PoliciesGuard } from '../../authorization/policies.guard';
import { WriteAssetPolicyHandler } from '../../authorization/policies/write-asset.policy-handler';
import { CheckPolicies } from '../../authorization/check-policies.decorator';

import { Element } from './models/element.model';
import { ElementService } from './element.service';
import { Element as DomainElement } from './types/element.repository.interface';
import { CreateElementCommand } from './commands/create-element.command';
import { ElementFactory } from './element.factory';
import { CreateElementInput } from './dto/create-element.input';

@Resolver((of) => Element)
@Resource(Element.name)
export class ElementResolver {
	constructor(private elementService: ElementService, private commandBus: CommandBus) {}

	@Mutation(() => Element)
	public async createElement(@Args('createElement') input: CreateElementInput): Promise<Element> {
		const domainElement: DomainElement = await this.commandBus.execute<CreateElementCommand>(
			new CreateElementCommand(input),
		);

		return ElementFactory.CreateElement(domainElement);
	}

	@Query((returns) => [Element], { name: 'decompositionElements' })
	@Roles({ roles: ['realm:aip_owner'] })
	async getSurveyElements(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.elementService.getElements(surveyId);
	}

	@Query((returns) => [Element], { name: 'tester' })
	@UseGuards(PoliciesGuard)
	@CheckPolicies(new WriteAssetPolicyHandler())
	async tester(@Args('code', { type: () => String }) code: string) {
		return [];
	}

	@Query((returns) => [Element], { name: 'tester2' })
	@UseGuards(PoliciesGuard)
	@CheckPolicies(new WriteAssetPolicyHandler())
	async tester2(@Args('code', { type: () => String }) code: string) {
		return [];
	}
}
