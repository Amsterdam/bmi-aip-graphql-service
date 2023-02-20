import { Field, ObjectType } from '@nestjs/graphql';

import { MeasureTypes, QuantityUnitOfMeasurement } from '../types/measure';
import { Survey } from '../../survey/models/survey.model';
import { Element } from '../../decomposition/models/element.model';
import { Unit } from '../../decomposition/models/unit.model';
import { Defect } from '../../ti/models/defect.model';
import { FailureMode } from '../../failure-mode/models/failure-mode.model';
import { Manifestation } from '../../decomposition/models/manifestation.model';

import { Measure } from './measure.model';
import { CyclicMeasure } from './cyclic-measure.model';

@ObjectType({ description: 'measure' })
export class MeasuresAndCyclicMeasuresCollection {
	@Field((type) => [Measure])
	measures: Measure[];

	@Field((type) => [CyclicMeasure])
	cyclicMeasures: CyclicMeasure[];
}
