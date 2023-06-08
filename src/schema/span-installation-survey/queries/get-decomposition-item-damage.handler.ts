import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionType } from '../../span-installation/types/span-decomposition-type';
import { JunctionBoxSurvey } from '../models/junction-box-survey.model';
import { FacadeSurveyService } from '../facade-survey.service';
import { FacadeSurvey } from '../models/facade-survey.model';

import { GetDecompositionItemDamageQuery } from './get-decomposition-item-damage.query';

export type OneOfOVSSurvey = JunctionBoxSurvey | FacadeSurvey;

@QueryHandler(GetDecompositionItemDamageQuery)
export class GetDecompositionItemDamageHandler implements IQueryHandler<GetDecompositionItemDamageQuery> {
	constructor(
		private junctionBoxService: JunctionBoxSurveyService,
		private facadeSurveyService: FacadeSurveyService,
	) {}

	async execute(query: GetDecompositionItemDamageQuery): Promise<OneOfOVSSurvey> {
		switch (query.decompositionType) {
			case SpanDecompositionType.spanJunctionBox:
				return this.junctionBoxService.getJunctionBoxSurveyOnPermanentId(query.decompositionId);
				break;
			case SpanDecompositionType.spanSupportSystemFacade:
				return this.facadeSurveyService.getFacadeSurveyOnPermanentId(query.decompositionId);
				break;
		}

		throw new Error('Decomposition type not found');
	}
}
