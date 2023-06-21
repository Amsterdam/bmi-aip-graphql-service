import { Injectable } from '@nestjs/common';

import { DerivedConditionScoreRepository } from './derived-condition-score.repository';
import { DerivedConditionScoreFactory } from './derived-condition-score.factory';
import { DerivedConditionScore } from './models/derived-condition-score.model';

@Injectable()
export class DerivedConditionScoreService {
	public constructor(private readonly derivedConditionScoreRepo: DerivedConditionScoreRepository) {}

	async getDerivedConditionScoresByElementId(elementId: string): Promise<DerivedConditionScore[]> {
		return (await this.derivedConditionScoreRepo.getDerivedConditionScoresByElementId(elementId)).map(
			(derivedConditionScore) => DerivedConditionScoreFactory.CreateDerivedConditionScore(derivedConditionScore),
		);
	}
}
