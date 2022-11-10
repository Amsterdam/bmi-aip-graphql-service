import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CompanyFactory } from './company.factory';

@Injectable()
export class CompanyService {
	public constructor(private readonly companyRepo: CompanyRepository) {}

	async getBatchExecutorCompanies(batchId: string) {
		console.log({ batchId });
		const companies = await this.companyRepo.getBatchExecutorCompanies(batchId);
		return companies.map((company) => CompanyFactory.CreateCompany(company));
	}
}
