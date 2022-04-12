import { Args, Query, Resolver } from '@nestjs/graphql';

import { Element } from './models/element.model';
import { ElementsService } from './elements.service';
import { AuthenticatedUser, AuthGuard, Resource, Roles } from 'nest-keycloak-connect';
// import { Injectable } from '@nestjs/common';
// import { UseGuards } from '@nestjs/common';

// @Injectable()
@Resolver((of) => Element)
@Resource(Element.name)
export class ElementsResolver {
	constructor(private elementsService: ElementsService) {}

	@Query((returns) => [Element], { name: 'decompositionElements' })
	async getSurveyElements(
		@Args('surveyId', { type: () => String }) surveyId: string,
		@Args('code', { type: () => String, nullable: true }) code?: number,
	) {
		return this.elementsService.getElements(surveyId, code);
	}

	@Query((returns) => Element, { name: 'decompositionElement' })
	// @UseGuards(AuthGuard)
	@Roles({ roles: ['aip_owner'] })
	async getElementById(@Args('id', { type: () => String }) elementId: string) {
		return this.elementsService.getElementById(elementId);
	}

	@Query((returns) => [Element], { name: 'tester' })
	async tester(@AuthenticatedUser() user: any) {
		console.log(':: user', user);
		return [];
	}
}
