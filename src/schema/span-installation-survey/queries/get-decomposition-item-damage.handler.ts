import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionType } from '../../span-installation/types/span-decomposition-type';
import { JunctionBoxSurvey } from '../models/junction-box-survey.model';

import { GetDecompositionItemDamageQuery } from './get-decomposition-item-damage.query';

export type OneOfOVSSurvey = JunctionBoxSurvey;

@QueryHandler(GetDecompositionItemDamageQuery)
export class GetDecompositionItemDamageHandler implements IQueryHandler<GetDecompositionItemDamageQuery> {
	constructor(private junctionBoxService: JunctionBoxSurveyService) {}

	async execute(query: GetDecompositionItemDamageQuery): Promise<OneOfOVSSurvey> {
		switch (query.decompositionType) {
			case SpanDecompositionType.spanJunctionBox:
				return this.junctionBoxService.getJunctionBoxSurveyOnPermanentId(query.decompositionId);
				break;
		}

		throw new Error('Decomposition type not found');
	}
}
