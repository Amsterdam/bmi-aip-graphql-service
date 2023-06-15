import { SupplierType } from './types';
import { Luminaire } from './models/luminaire.model';
import { Luminaire as DomainLuminaire } from './types/luminaire.repository.interface';

export class LuminaireFactory {
	static CreateLuminaire({
		id,
		supportSystemId,
		name,
		location,
		hasLED,
		constructionYear,
		supplierType,
		manufacturer,
		remarks,
		geography,
		geographyRD,
		driverSupplierType,
		driverCommissioningDate,
		lightSupplierType,
		lightCommissioningDate,
		created_at: createdAt,
		updated_at: updatedAt,
		deleted_at: deletedAt,
		permanentId,
		remarksRevision,
	}: DomainLuminaire): Luminaire {
		const luminaire = new Luminaire();
		luminaire.id = id;
		luminaire.supportSystemId = supportSystemId;
		luminaire.name = name;
		luminaire.location = location;
		luminaire.hasLED = hasLED;
		luminaire.constructionYear = constructionYear;
		luminaire.supplierType = SupplierType[supplierType];
		luminaire.manufacturer = manufacturer;
		luminaire.geography = geography;
		luminaire.permanentId = permanentId;
		luminaire.remarksRevision = remarksRevision;

		const parsedGeographyRD = JSON.parse(JSON.stringify(geographyRD));
		// Allow geographyRD to be null by not defining it
		if (parsedGeographyRD?.type) {
			luminaire.geographyRD = parsedGeographyRD;
		}

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
