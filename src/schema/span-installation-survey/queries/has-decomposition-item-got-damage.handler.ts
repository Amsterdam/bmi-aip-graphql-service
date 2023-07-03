import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionItemType } from '../../span-installation/types/span-decomposition-item-type';
import { FacadeSurveyService } from '../facade-survey.service';
import { MastSurveyService } from '../mast-survey.service';
import { NodeSurveyService } from '../node-survey.service';
import { TensionWireSurveyService } from '../tension-wire-survey.service';
import { LuminaireSurveyService } from '../luminaire-survey.service';

import { HasDecompositionItemGotDamageQuery } from './has-decomposition-item-got-damage.query';

@QueryHandler(HasDecompositionItemGotDamageQuery)
export class HasDecompositionItemGotDamageHandler implements IQueryHandler<HasDecompositionItemGotDamageQuery> {
	constructor(
		private junctionBoxService: JunctionBoxSurveyService,
		private facadeSurveyService: FacadeSurveyService,
		private mastSurveyService: MastSurveyService,
		private nodeSurveyService: NodeSurveyService,
		private tensionWireSurveyService: TensionWireSurveyService,
		private luminaireSurveyService: LuminaireSurveyService,
	) {}

	async execute(query: HasDecompositionItemGotDamageQuery): Promise<boolean> {
		console.log(query);
		switch (query.decompositionItemType) {
			case SpanDecompositionItemType.spanJunctionBox:
				return this.junctionBoxService.hasDamage(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanSupportSystemFacade:
				return this.facadeSurveyService.hasDamage(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanSupportSystemMast:
				return this.mastSurveyService.hasDamage(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanSupportSystemNode:
				return this.nodeSurveyService.hasDamage(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanSupportSystemTensionWire:
				return this.tensionWireSurveyService.hasDamage(query.decompositionItemId);
				break;
			case SpanDecompositionItemType.spanLuminaire:
				return this.luminaireSurveyService.hasDamage(query.decompositionItemId);
				break;
		}

		throw new Error('Decomposition type not found');
	}
}
