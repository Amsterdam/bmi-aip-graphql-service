import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionType } from '../../span-installation/types/span-decomposition-type';
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
		switch (query.decompositionType) {
			case SpanDecompositionType.spanJunctionBox:
				return this.junctionBoxService.hasDamage(query.decompositionId);
				break;
			case SpanDecompositionType.spanSupportSystemFacade:
				return this.facadeSurveyService.hasDamage(query.decompositionId);
				break;
			case SpanDecompositionType.spanSupportSystemMast:
				return this.mastSurveyService.hasDamage(query.decompositionId);
				break;
			case SpanDecompositionType.spanSupportSystemNode:
				return this.nodeSurveyService.hasDamage(query.decompositionId);
				break;
			case SpanDecompositionType.spanSupportSystemTensionWire:
				return this.tensionWireSurveyService.hasDamage(query.decompositionId);
				break;
			case SpanDecompositionType.spanLuminaire:
				return this.luminaireSurveyService.hasDamage(query.decompositionId);
				break;
		}

		throw new Error('Decomposition type not found');
	}
}
