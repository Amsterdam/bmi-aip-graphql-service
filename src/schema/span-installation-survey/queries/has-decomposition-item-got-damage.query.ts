import { SpanDecompositionItemType } from '../../span-installation/types/span-decomposition-item-type';

export class HasDecompositionItemGotDamageQuery {
	public constructor(
		public readonly decompositionItemId: string,
		public readonly decompositionItemType: SpanDecompositionItemType,
	) {}
}
