import { Args, Query, Resolver } from '@nestjs/graphql';

import { Element } from './models/element.model';
import { ElementsService } from './elements.service';

@Resolver((of) => Element)
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
	async getElementById(@Args('id', { type: () => String }) elementId: string) {
		return this.elementsService.getElementById(elementId);
	}
}
