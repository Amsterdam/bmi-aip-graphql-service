import { SupportSystemType } from '../../span-installation/types';
import { SpanDecompositionItemType } from '../../span-installation/types/span-decomposition-item-type';

export const supportSystemToSpanDecompositionItemMapping: Record<SupportSystemType, SpanDecompositionItemType> = {
	[SupportSystemType.TensionWire]: SpanDecompositionItemType.spanSupportSystemTensionWire,
	[SupportSystemType.Facade]: SpanDecompositionItemType.spanSupportSystemFacade,
	[SupportSystemType.Mast]: SpanDecompositionItemType.spanSupportSystemMast,
	[SupportSystemType.Node]: SpanDecompositionItemType.spanSupportSystemNode,
};
