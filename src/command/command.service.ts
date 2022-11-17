import { Injectable } from '@nestjs/common';

import { CommandRepository } from './command.repository';
import type { CommandReturnType } from './types';

@Injectable()
export class CommandService {
	public constructor(private readonly repo: CommandRepository) {}

	setOVSSurveySurveyors(): Promise<CommandReturnType> {
		return this.repo.setOVSSurveySurveyors();
	}
}
