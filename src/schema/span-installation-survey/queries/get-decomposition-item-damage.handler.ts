import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionType } from '../../span-installation/types/span-decomposition-type';
import { JunctionBoxSurvey } from '../models/junction-box-survey.model';
import { FacadeSurveyService } from '../facade-survey.service';
import { FacadeSurvey } from '../models/facade-survey.model';
import { MastSurveyService } from '../mast-survey.service';
import { NodeSurveyService } from '../node-survey.service';
import { NodeSurvey } from '../models/node-survey.model';
import { MastSurvey } from '../models/mast-survey.model';
import { TensionWireSurveyService } from '../tension-wire-survey.service';

import { GetDecompositionItemDamageQuery } from './get-decomposition-item-damage.query';

export type OneOfOVSSurvey = JunctionBoxSurvey | FacadeSurvey | MastSurvey | NodeSurvey;

@QueryHandler(GetDecompositionItemDamageQuery)
export class GetDecompositionItemDamageHandler implements IQueryHandler<GetDecompositionItemDamageQuery> {
	constructor(
		private junctionBoxService: JunctionBoxSurveyService,
		private facadeSurveyService: FacadeSurveyService,
		private mastSurveyService: MastSurveyService,
		private nodeSurveyService: NodeSurveyService,
		private tensionWireSurveyService: TensionWireSurveyService,
	) {}

	async execute(query: GetDecompositionItemDamageQuery): Promise<OneOfOVSSurvey> {
		switch (query.decompositionType) {
			case SpanDecompositionType.spanJunctionBox:
				return this.junctionBoxService.getJunctionBoxSurveyOnPermanentId(query.decompositionId);
				break;
			case SpanDecompositionType.spanSupportSystemFacade:
				return this.facadeSurveyService.getFacadeSurveyOnPermanentId(query.decompositionId);
				break;
			case SpanDecompositionType.spanSupportSystemMast:
				return this.mastSurveyService.getMastSurveyOnPermanentId(query.decompositionId);
				break;
			case SpanDecompositionType.spanSupportSystemNode:
				return this.nodeSurveyService.getNodeSurveyOnPermanentId(query.decompositionId);
				break;
			case SpanDecompositionType.spanSupportSystemTensionWire:
				return this.tensionWireSurveyService.getTensionWireSurveyOnPermanentId(query.decompositionId);
				break;
		}

		throw new Error('Decomposition type not found');
	}
}
