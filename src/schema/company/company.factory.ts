import { DBCompany } from './types/company.repository.interface';
import { Company } from './models/company.model';

export class CompanyFactory {
	static CreateCompany({
		id,
		role,
		name,
		street,
		state,
		city,
		zip,
		country,
		storageLimit,
		storageUsed,
		status,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DBCompany): Company {
		const company = new Company();
		company.id = id;
		company.role = role;
		company.name = name;
		company.street = street;
		company.state = state;
		company.city = city;
		company.zip = zip;
		company.country = country;
		company.storageLimit = Number(storageLimit);
		company.storageUsed = Number(storageUsed);
		company.status = status;
		company.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		company.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		return company;
	}
}
