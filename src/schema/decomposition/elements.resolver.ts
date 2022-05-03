import { Args, Query, Resolver } from '@nestjs/graphql';
import { Resource, Roles } from 'nest-keycloak-connect';
import { UseGuards } from '@nestjs/common';

import { PoliciesGuard } from '../../authorization/policies.guard';
import { WriteAssetPolicyHandler } from '../../authorization/policies/write-asset.policy-handler';
import { Element } from './models/element.model';
import { ElementsService } from './elements.service';
import { CheckPolicies } from '../../authorization/check-policies.decorator';

@Resolver((of) => Element)
@Resource(Element.name)
export class ElementsResolver {
	constructor(private elementsService: ElementsService) {}

	@Query((returns) => [Element], { name: 'decompositionElements' })
	@Roles({ roles: ['realm:aip_owner'] })
	async getSurveyElements(
		@Args('surveyId', { type: () => String }) surveyId: string,
		@Args('code', { type: () => String, nullable: true }) code?: number,
	) {
		return this.elementsService.getElements(surveyId, code);
	}

	@Query((returns) => Element, { name: 'decompositionElement' })
	async getElementById(@Args('id', { type: () => String }) elementId: string) {
		return this.elementsService.getElementById(elementId);
	}

	@Query((returns) => [Element], { name: 'tester' })
	@UseGuards(PoliciesGuard)
	@CheckPolicies(new WriteAssetPolicyHandler())
	async tester(@Args('code', { type: () => String }) code: string) {
		// const ability = this.caslAbilityFactory.createForUser(user);
		// console.log(':: tester1 user', user);
		return [];
	}

	@Query((returns) => [Element], { name: 'tester2' })
	@UseGuards(PoliciesGuard)
	@CheckPolicies(new WriteAssetPolicyHandler())
	async tester2(@Args('code', { type: () => String }) code: string) {
		// const ability = this.caslAbilityFactory.createForUser(user);
		// console.log(':: tester2 user', user);
		console.log('asset code', code);
		return [];
	}
}
