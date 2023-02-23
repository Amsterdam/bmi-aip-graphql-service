import { Field, ObjectType } from '@nestjs/graphql';

import { Measure } from './measure.model';
import { CyclicMeasure } from './cyclic-measure.model';

@ObjectType({ description: 'measure' })
export class MeasuresAndCyclicMeasuresCollection {
	@Field((type) => [Measure])
	measures: Measure[];

	@Field((type) => [CyclicMeasure])
	cyclicMeasures: CyclicMeasure[];
}
