import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
// import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

// import { PoliciesGuard } from '../../authorization/policies.guard';
// import { WriteAssetPolicyHandler } from '../../authorization/policies/write-asset.policy-handler';
// import { CheckPolicies } from '../../authorization/check-policies.decorator';

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
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createElement(@Args('createElement') input: CreateElementInput): Promise<Element> {
		const domainElement: DomainElement = await this.commandBus.execute<CreateElementCommand>(
			new CreateElementCommand(input),
		);
		return ElementFactory.CreateElement(domainElement);
	}

	@Mutation(() => Element)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updateElement(@Args('updateElement') input: UpdateElementInput): Promise<Element> {
		const domainElement: DomainElement = await this.commandBus.execute<UpdateElementCommand>(
			new UpdateElementCommand(input),
		);
		return ElementFactory.CreateElement(domainElement);
	}

	@Mutation(() => Element)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async deleteElement(@Args('identifier') identifier: string): Promise<Element> {
		return this.commandBus.execute<DeleteElementCommand>(new DeleteElementCommand(identifier));
	}

	@Query((returns) => [Element], { name: 'decompositionElements' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	async getSurveyElements(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.elementService.getElements(surveyId);
	}

	// Leaving this here on purpose to illustrate usage of the PoliciesGuard
	// @Query((returns) => [Element], { name: 'tester' })
	// @UseGuards(PoliciesGuard)
	// @CheckPolicies(new WriteAssetPolicyHandler())
	// async tester(@Args('code', { type: () => String }) code: string) {
	// 	return [];
	// }
	//
	// @Query((returns) => [Element], { name: 'tester2' })
	// @UseGuards(PoliciesGuard)
	// @CheckPolicies(new WriteAssetPolicyHandler())
	// async tester2(@Args('code', { type: () => String }) code: string) {
	// 	return [];
	// }
}
