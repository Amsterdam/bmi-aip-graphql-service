import { SpanDecompositionType } from '../types/span-decomposition-type';
export class FindSpanMeasureOptionsQuery {
	public constructor(public decompositionType: SpanDecompositionType) {}
}
