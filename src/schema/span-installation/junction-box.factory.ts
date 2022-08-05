import { JunctionBox } from './models/junction-box.model';
import { JunctionBox as DomainJunctionBox } from './types/junction-box.repository.interface';

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
		jb.a11yDetails = a11yDetails;
		jb.installationHeight = installationHeight;
		jb.riserTubeVisible = riserTubeVisible;
		jb.remarks = remarks;
		jb.geography = geography;
		jb.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		jb.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		jb.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return jb;
	}
}
