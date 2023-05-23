import { createUnionType } from '@nestjs/graphql';

import { JunctionBox } from './junction-box.model';
import { Luminaire } from './luminaire.model';
import { SupportSystem } from './support-system.model';

export const SpanDecomposition = createUnionType({
	name: 'SpanDecomposition',
	types: () => [JunctionBox, SupportSystem],
	resolveType: (value) => {
		if ('type' in value) {
			return SupportSystem;
		}
		return JunctionBox;
	},
});
