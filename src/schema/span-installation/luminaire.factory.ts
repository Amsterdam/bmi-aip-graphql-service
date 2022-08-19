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
		luminaire.objectId = objectId;
		luminaire.name = name;
		luminaire.location = location;
		luminaire.constructionYear = constructionYear;
		luminaire.supplierType = supplierType;
		luminaire.manufacturer = manufacturer;
		luminaire.geography = geography;
		luminaire.driverSupplierType = driverSupplierType;
		luminaire.driverCommissioningDate = driverCommissioningDate;
		luminaire.lightSupplierType = lightSupplierType;
		luminaire.lightCommissioningDate = lightCommissioningDate;
		luminaire.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		luminaire.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		luminaire.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return luminaire;
	}
}
