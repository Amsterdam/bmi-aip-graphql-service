import { JunctionBox } from './models/junction-box.model';
import { JunctionBox as DomainJunctionBox } from './types/junction-box.repository.interface';
import { A11yDetailsFactory } from './a11y-details.factory';

export class JunctionBoxFactory {
	static CreateJunctionBox({
		id,
		surveyId,
		objectId,
		name,
		mastNumber,
		location,
		locationIndication,
		a11yDetails,
		installationHeight,
		riserTubeVisible,
		remarks,
		geography,
		geographyRD,
		created_at: createdAt,
		updated_at: updatedAt,
		deleted_at: deletedAt,
	}: DomainJunctionBox): JunctionBox {
		const jb = new JunctionBox();
		jb.id = id;
		jb.objectId = objectId;
		jb.surveyId = surveyId;
		jb.name = name;
		jb.mastNumber = Number(mastNumber);
		jb.location = location;
		jb.locationIndication = locationIndication;
		jb.installationHeight = Number(installationHeight);
		jb.riserTubeVisible = riserTubeVisible;
		jb.remarks = remarks;
		jb.geography = geography;

		const parsedGeographyRD = JSON.parse(JSON.stringify(geographyRD));
		// Allow geographyRD to be null by not defining it
		if (parsedGeographyRD?.type) {
			jb.geographyRD = parsedGeographyRD;
		}

		jb.a11yDetails = A11yDetailsFactory.CreateA11yDetailsFromJSONB(a11yDetails as string);
		jb.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		jb.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		jb.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return jb;
	}
}
