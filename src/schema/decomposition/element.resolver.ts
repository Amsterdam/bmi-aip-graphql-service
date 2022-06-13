import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, Roles } from 'nest-keycloak-connect';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { PoliciesGuard } from '../../authorization/policies.guard';
import { WriteAssetPolicyHandler } from '../../authorization/policies/write-asset.policy-handler';
import { CheckPolicies } from '../../authorization/check-policies.decorator';

import { Element } from './models/element.model';
import { ElementFactory } from './element.factory';
import { ElementService } from './element.service';
import { CreateElementInput } from './dto/create-element.input';
import { UpdateElementInput } from './dto/update-element.input';
import { CreateElementCommand } from './commands/create-element.command';
import { UpdateElementCommand } from './commands/update-element.command';
import { Element as DomainElement } from './types/element.repository.interface';
import { DeleteElementCommand } from './commands/delete-element.command';

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

	@Mutation(() => Element)
	public async updateElement(@Args('updateElement') input: UpdateElementInput): Promise<Element> {
		const domainElement: DomainElement = await this.commandBus.execute<UpdateElementCommand>(
			new UpdateElementCommand(input),
		);
		return ElementFactory.CreateElement(domainElement);
	}

	@Mutation(() => Element)
	public async deleteElement(@Args('identifier') identifier: string): Promise<Element> {
		const domainElement: DomainElement = await this.commandBus.execute<DeleteElementCommand>(
			new DeleteElementCommand(identifier),
		);
		return ElementFactory.CreateElement(domainElement);
	}

	@Query((returns) => [Element], { name: 'decompositionElements' })
	@Roles({ roles: ['realm:aip_owner'] })
	async getSurveyElements(
		@Args('surveyId', { type: () => String }) surveyId: string,
		@Args('code', { type: () => String, nullable: true }) code?: string,
	) {
		return this.elementService.getElements(surveyId, code);
	}

	@Query((returns) => Element, { name: 'decompositionElement' })
	async getElementById(@Args('id', { type: () => String }) elementId: string) {
		return this.elementService.getElementById(elementId);
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
