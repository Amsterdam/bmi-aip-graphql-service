import { SpanMeasure } from './models/span-measure.model';
import { SpanMeasure as DomainSpanMeasure } from './types/span-measure.repository.interface';

export class SpanMeasureFactory {
	static CreateSpanMeasure({
		id,
		decompositionId,
		decompositionType,
		surveyId,
		name,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainSpanMeasure): SpanMeasure {
		const spanMeasure = new SpanMeasure();
		spanMeasure.id = id;
		spanMeasure.decompositionId = decompositionId;
		spanMeasure.decompositionType = decompositionType;
		spanMeasure.surveyId = surveyId;
		spanMeasure.name = name;
		spanMeasure.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		spanMeasure.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;

		return spanMeasure;
	}
}
