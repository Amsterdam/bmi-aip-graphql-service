import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionType } from '../../span-installation/types/span-decomposition-type';
import { FacadeSurveyService } from '../facade-survey.service';

import { HasDecompositionItemGotDamageQuery } from './has-decomposition-item-got-damage.query';

@QueryHandler(HasDecompositionItemGotDamageQuery)
export class HasDecompositionItemGotDamageHandler implements IQueryHandler<HasDecompositionItemGotDamageQuery> {
	constructor(
		private junctionBoxService: JunctionBoxSurveyService,
		private facadeSurveyService: FacadeSurveyService,
	) {}

	async execute(query: HasDecompositionItemGotDamageQuery): Promise<boolean> {
		switch (query.decompositionType) {
			case SpanDecompositionType.spanJunctionBox:
				return this.junctionBoxService.hasDamage(query.decompositionId);
				break;
			case SpanDecompositionType.spanJunctionBox:
				return this.facadeSurveyService.hasDamage(query.decompositionId);
				break;
		}

		throw new Error('Decomposition type not found');
	}
}
