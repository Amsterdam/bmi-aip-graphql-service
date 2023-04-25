import { SpanMeasure } from './models/span-measure.model';

export class SpanMeasureFactory {
	static CreateMeasures(staticMeasures): SpanMeasure {
		const measuresModel = new SpanMeasure();
		const parsedMeasures = staticMeasures as SpanMeasure;
		measuresModel.id = parsedMeasures?.id;
		measuresModel.name = parsedMeasures.name;
		return measuresModel;
	}
}
