import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, Resource, Roles } from 'nest-keycloak-connect';

import { Element } from './models/element.model';
import { ElementsService } from './elements.service';

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
	async tester(@AuthenticatedUser() user: any) {
		console.log(':: user', user);
		return [];
	}
}
