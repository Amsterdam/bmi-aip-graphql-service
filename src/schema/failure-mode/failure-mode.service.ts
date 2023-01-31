import { Injectable } from '@nestjs/common';

import { FailureMode } from './models/failure-mode.model';
import { FailureModeFactory } from './failure-mode.factory';
import { FailureModeRepository } from './failure-mode.repository';

@Injectable()
export class FailureModeService {
	public constructor(private readonly failureModeRepo: FailureModeRepository) {}

	async findFailureModes(surveyId: string): Promise<FailureMode[]> {
		return (await this.failureModeRepo.findFailureModes(surveyId)).map((failureMode) =>
			FailureModeFactory.CreateFailureMode(failureMode),
		);
	}

	async getFailureMode(failureModeId: string) {
		return FailureModeFactory.CreateFailureMode(await this.failureModeRepo.getFailureMode(failureModeId));
	}
}
