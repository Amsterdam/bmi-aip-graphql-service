import { CyclicMeasure } from 'src/schema/measure/models/cyclic-measure.model';
import { Measure } from 'src/schema/measure/models/measure.model';

export type MeasuresAndCyclicMeasuresCollection = {
	measures: Measure[];
	cyclicMeasures: CyclicMeasure[];
};
