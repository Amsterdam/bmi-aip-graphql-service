import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import {
	DerivedConditionScore,
	IDerivedConditionScoreRepository,
} from './types/derived-condition-score.repository.interface';

@Injectable()
export class DerivedConditionScoreRepository implements IDerivedConditionScoreRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getDerivedConditionScoresByElementId(elementId: string): Promise<DerivedConditionScore[]> {
		return this.prisma.derivedConditionScores.findMany({
			where: {
				elementId: elementId,
			},
		});
	}
}
