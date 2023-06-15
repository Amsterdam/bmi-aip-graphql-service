import { SpanDecompositionType } from '../../span-installation/types/span-decomposition-type';

export class HasDecompositionItemGotDamageQuery {
	public constructor(
		public readonly decompositionId: string,
		public readonly decompositionType: SpanDecompositionType,
	) {}
}
