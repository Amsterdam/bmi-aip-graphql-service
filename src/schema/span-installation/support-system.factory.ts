import { SupportSystemType, SupportSystemTypeDetailed } from './types';
import { SupportSystem } from './models/support-system.model';
import { SupportSystem as DomainSupportSystem } from './types/support-system.repository.interface';
import { A11yDetails } from './models/a11y-details.model';

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
		created_at: createdAt,
		updated_at: updatedAt,
		deleted_at: deletedAt,
	}: DomainSupportSystem): SupportSystem {
		const supportSystem = new SupportSystem();
		const a11yDetailsModel = Object.keys(a11yDetails).reduce((acc, key) => {
			acc[key] = a11yDetails[key];
			return acc;
		}, new A11yDetails());
		supportSystem.id = id;
		supportSystem.objectId = objectId;
		supportSystem.surveyId = surveyId;
		supportSystem.name = name;
		supportSystem.location = location;
		supportSystem.locationIndication = locationIndication;
		supportSystem.a11yDetails = a11yDetailsModel;
		supportSystem.installationHeight = Number(installationHeight);
		supportSystem.remarks = remarks;
		supportSystem.constructionYear = constructionYear;
		supportSystem.houseNumber = houseNumber;
		supportSystem.type = SupportSystemType[type];
		supportSystem.typeDetailed = typeDetailed as SupportSystemTypeDetailed;
		supportSystem.geography = geography;
		supportSystem.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		supportSystem.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		supportSystem.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return supportSystem;
	}
}
