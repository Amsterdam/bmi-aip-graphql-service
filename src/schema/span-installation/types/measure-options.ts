import { SpanMeasureOption } from '../models/span-measure-option.model';
import { SpanMeasureItemOption } from '../models/span-measure-item-option.model';

import {
	spanMeasureOptions as spanMeasureOptionsJson,
	spanMeasureItemOptions as spanMeasureItemOptionsJson,
} from './data/normalized-data-measures.json';

export const spanMeasureOptions: SpanMeasureOption[] = spanMeasureOptionsJson;
export const spanMeasureItems: SpanMeasureItemOption[] = spanMeasureItemOptionsJson;
