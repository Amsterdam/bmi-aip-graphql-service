import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionItemType } from '../../span-installation/types/span-decomposition-item-type';
import { JunctionBoxSurvey } from '../models/junction-box-survey.model';
import { FacadeSurveyService } from '../facade-survey.service';
import { FacadeSurvey } from '../models/facade-survey.model';
import { MastSurveyService } from '../mast-survey.service';
import { NodeSurveyService } from '../node-survey.service';
import { NodeSurvey } from '../models/node-survey.model';
import { MastSurvey } from '../models/mast-survey.model';
import { TensionWireSurveyService } from '../tension-wire-survey.service';
import { LuminaireSurveyService } from '../luminaire-survey.service';
import { LuminaireSurvey } from '../models/luminaire-survey.model';

import { GetDecompositionItemDamageQuery } from './get-decomposition-item-damage.query';

@QueryHandler(GetDecompositionItemDamageQuery)
export class GetDecompositionItemDamageHandler implements IQueryHandler<GetDecompositionItemDamageQuery> {
	constructor(
		private junctionBoxService: JunctionBoxSurveyService,
		private facadeSurveyService: FacadeSurveyService,
		private mastSurveyService: MastSurveyService,
		private nodeSurveyService: NodeSurveyService,
		private tensionWireSurveyService: TensionWireSurveyService,
		private luminaireSurveyService: LuminaireSurveyService,
	) {}

	async execute(
		query: GetDecompositionItemDamageQuery,
	): Promise<JunctionBoxSurvey | FacadeSurvey | MastSurvey | NodeSurvey | LuminaireSurvey> {
		switch (query.decompositionItemType) {
			case SpanDecompositionItemType.spanJunctionBox:
				return this.junctionBoxService.getJunctionBoxSurveyOnPermanentId(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanSupportSystemFacade:
				return this.facadeSurveyService.getFacadeSurveyOnPermanentId(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanSupportSystemMast:
				return this.mastSurveyService.getMastSurveyOnPermanentId(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanSupportSystemNode:
				return this.nodeSurveyService.getNodeSurveyOnPermanentId(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanSupportSystemTensionWire:
				return this.tensionWireSurveyService.getTensionWireSurveyOnPermanentId(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanLuminaire:
				return this.luminaireSurveyService.getLuminaireSurveyOnPermanentId(query.decompositionItemId);
				break;
		}

		throw new Error('Decomposition type not found');
	}
}
