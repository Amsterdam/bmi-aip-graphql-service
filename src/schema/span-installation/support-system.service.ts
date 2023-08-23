import { Injectable } from '@nestjs/common';

import { SupportSystem } from './models/support-system.model';
import { SupportSystemFactory } from './support-system.factory';
import { SupportSystemRepository } from './support-system.repository';

@Injectable()
export class SupportSystemService {
	public constructor(private readonly supportSystemRepo: SupportSystemRepository) {}

	async findByObject(objectId: string): Promise<SupportSystem[]> {
		return (await this.supportSystemRepo.findByObject(objectId)).map((supportSystem) =>
			SupportSystemFactory.CreateSupportSystem(supportSystem),
		);
	}

	async getSupportSystems(surveyId: string): Promise<SupportSystem[]> {
		return (await this.supportSystemRepo.getSupportSystems(surveyId)).map((supportSystem) =>
			SupportSystemFactory.CreateSupportSystem(supportSystem),
		);
	}
}
