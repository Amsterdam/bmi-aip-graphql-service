import { Prisma } from '.prisma/client';

import { SpanDecompositionData } from './models/span-decomposition-data.model';

export class SpanDecompositionDataFactory {
	static CreateSpanDecompositionDataFFromJSONB(spanDecompositionData: Prisma.JsonValue): SpanDecompositionData {
		const spanDecompositionDataModel = new SpanDecompositionData();
		const parsedSpanDecompositionData = spanDecompositionData as SpanDecompositionData;

		spanDecompositionDataModel.remarks = parsedSpanDecompositionData?.remarks;

		return spanDecompositionDataModel;
	}
}
