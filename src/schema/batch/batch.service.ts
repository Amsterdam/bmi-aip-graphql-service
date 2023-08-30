import { Injectable } from '@nestjs/common';

import { CompanyFactory } from '../company/company.factory';

import { BatchRepository } from './batch.repository';

@Injectable()
export class BatchService {
	public constructor(private readonly batchRepo: BatchRepository) {}

	async findForAssetThroughSurveys(objectId: string) {
		return this.batchRepo.findBatchesForAssetThroughSurveys(objectId);
	}

	async getBatchExecutorCompanies(batchId: string) {
		return (await this.batchRepo.getBatchExecutorCompanies(batchId)).map((batch) =>
			CompanyFactory.CreateCompany(batch),
		);
	}
}
