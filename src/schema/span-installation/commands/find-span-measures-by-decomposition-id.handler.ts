import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureService } from '../span-measure.service';
import { SpanMeasure } from '../models/span-measure.model';

import { FindSpanMeasuresByDecompositionIdCommand } from './find-span-measures-by-decomposition-id.command';

@CommandHandler(FindSpanMeasuresByDecompositionIdCommand)
export class FindSpanMeasuresByDecompositionIdHandler
	implements ICommandHandler<FindSpanMeasuresByDecompositionIdCommand>
{
	constructor(private service: SpanMeasureService) {}

	public async execute({ decompositionId }: FindSpanMeasuresByDecompositionIdCommand): Promise<SpanMeasure[]> {
		return this.service.findSpanMeasuresByDecompositionId(decompositionId);
	}
}
