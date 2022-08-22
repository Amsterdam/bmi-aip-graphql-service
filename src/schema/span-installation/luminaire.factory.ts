import { SupplierType } from '../../types';

import { Luminaire } from './models/luminaire.model';
import { Luminaire as DomainLuminaire } from './types/luminaire.repository.interface';

export class LuminaireFactory {
	static CreateLuminaire({
		id,
		supportSystemId,
		name,
		location,
		constructionYear,
		supplierType,
		manufacturer,
		remarks,
		geography,
		driverSupplierType,
		driverCommissioningDate,
		lightSupplierType,
		lightCommissioningDate,
		created_at: createdAt,
		updated_at: updatedAt,
		deleted_at: deletedAt,
	}: DomainLuminaire): Luminaire {
		const luminaire = new Luminaire();
		luminaire.id = id;
		luminaire.supportSystemId = supportSystemId;
		luminaire.name = name;
		luminaire.location = location;
		luminaire.constructionYear = constructionYear;
		luminaire.supplierType = SupplierType[supplierType];
		luminaire.manufacturer = manufacturer;
		luminaire.geography = geography;
		luminaire.remarks = remarks;
		luminaire.driverSupplierType = SupplierType[driverSupplierType];
		luminaire.driverCommissioningDate =
			driverCommissioningDate instanceof Date ? driverCommissioningDate.toUTCString() : null;
		luminaire.lightSupplierType = SupplierType[lightSupplierType];
		luminaire.lightCommissioningDate =
			lightCommissioningDate instanceof Date ? lightCommissioningDate.toUTCString() : null;
		luminaire.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		luminaire.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		luminaire.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return luminaire;
	}
}
