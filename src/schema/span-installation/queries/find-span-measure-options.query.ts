import { SpanDecompositionItemType } from '../types/span-decomposition-item-type';
export class FindSpanMeasureOptionsQuery {
	public constructor(public decompositionItemType: SpanDecompositionItemType) {}
}
