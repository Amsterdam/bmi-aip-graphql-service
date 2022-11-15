import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/models/company.model';

import { FindBatchExecutorCompaniesQuery } from './find-batch-executor-companies.query';

@QueryHandler(FindBatchExecutorCompaniesQuery)
export class FindBatchExecutorCompaniesHandler implements IQueryHandler<FindBatchExecutorCompaniesQuery> {
	constructor(private service: CompanyService) {}

	async execute(query: FindBatchExecutorCompaniesQuery): Promise<Company[]> {
		return this.service.getBatchExecutorCompanies(query.batchId);
	}
}
