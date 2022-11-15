import { Resolver } from '@nestjs/graphql';
import { Resource } from 'nest-keycloak-connect';

import { Company } from './models/company.model';
import { CompanyService } from './company.service';

@Resolver((of) => Company)
@Resource(Company.name)
export class CompanyResolver {
	constructor(private companyService: CompanyService) {}
}
