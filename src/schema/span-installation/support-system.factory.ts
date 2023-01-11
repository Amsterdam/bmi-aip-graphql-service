import { SupportSystemType, SupportSystemTypeDetailed } from './types';
import { SupportSystem } from './models/support-system.model';
import { SupportSystem as DomainSupportSystem } from './types/support-system.repository.interface';
import { A11yDetailsFactory } from './a11y-details.factory';

export class SupportSystemFactory {
	static CreateSupportSystem({
		id,
		surveyId,
		objectId,
		name,
		location,
		locationIndication,
		a11yDetails,
		installationHeight,
		remarks,
		constructionYear,
		houseNumber,
		type,
		typeDetailed,
		geography,
		geographyRD,
		created_at: createdAt,
		updated_at: updatedAt,
		deleted_at: deletedAt,
	}: DomainSupportSystem): SupportSystem {
		const supportSystem = new SupportSystem();
		supportSystem.id = id;
		supportSystem.objectId = objectId;
		supportSystem.surveyId = surveyId;
		supportSystem.name = name;
		supportSystem.location = location;
		supportSystem.locationIndication = locationIndication;
		supportSystem.installationHeight = Number(installationHeight);
		supportSystem.remarks = remarks;
		supportSystem.constructionYear = constructionYear;
		supportSystem.houseNumber = houseNumber;
		supportSystem.type = SupportSystemType[type];
		supportSystem.typeDetailed = typeDetailed as SupportSystemTypeDetailed;
		supportSystem.geography = geography;

		const parsedGeographyRD = JSON.parse(JSON.stringify(geographyRD));
		// Allow geographyRD to be null by not defining it
		if (parsedGeographyRD?.type) {
			supportSystem.geographyRD = parsedGeographyRD;
		}

		supportSystem.a11yDetails = A11yDetailsFactory.CreateA11yDetailsFromJSONB(a11yDetails as string);
		supportSystem.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		supportSystem.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		supportSystem.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return supportSystem;
	}
}
