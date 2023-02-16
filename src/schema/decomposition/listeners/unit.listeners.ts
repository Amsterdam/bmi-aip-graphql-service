import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CyclicMeasureCreatedEvent } from '../events/cyclic-measure-created.event';

@Injectable()
export class CyclicMeasureCreatedListener {
	@OnEvent('cyclicMeasure.created')
	handleCyclicMeasureCreatedEvent(event: CyclicMeasureCreatedEvent) {
		// handle and process "OrderCreatedEvent" event
		console.log(event);
	}
}
