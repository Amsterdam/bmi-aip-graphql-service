import { SpanMeasure } from './models/span-measure.model';
import { SpanMeasure as DomainSpanMeasure } from './types/span-measure.repository.interface';

export class SpanMeasureFactory {
	static CreateSpanMeasure({
		id,
		optionId,
		decompositionItemId,
		decompositionItemType,
		surveyId,
		description,
		created_at: created_at,
		updated_at: updated_at,
	}: DomainSpanMeasure): SpanMeasure {
		const spanMeasure = new SpanMeasure();
		spanMeasure.id = id;
		spanMeasure.optionId = optionId;
		spanMeasure.decompositionItemId = decompositionItemId;
		spanMeasure.decompositionItemType = decompositionItemType;
		spanMeasure.surveyId = surveyId;
		spanMeasure.description = description;
		spanMeasure.created_at = created_at instanceof Date ? created_at.toUTCString() : null;
		spanMeasure.updated_at = updated_at instanceof Date ? updated_at.toUTCString() : null;

		return spanMeasure;
	}
}
