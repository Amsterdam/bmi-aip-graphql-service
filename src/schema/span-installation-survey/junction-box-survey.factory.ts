import { JunctionBoxSurvey as DomainJunctionBoxSurvey } from './types/junction-box-survey.repository.interface';
import { JunctionBoxSurvey } from './models/junction-box-survey.model';

export class JunctionBoxSurveyFactory {
	static CreateJunctionBoxSurvey({
		id,
		junctionBoxId,
		cableDamage,
		faultyMontageTensionWire,
		faultyMontageFacade,
		junctionBoxDamage,
		stickerNotReadable,
		remarks,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainJunctionBoxSurvey): JunctionBoxSurvey {
		const junctionBoxSurvey = new JunctionBoxSurvey();
		junctionBoxSurvey.id = id;
		junctionBoxSurvey.junctionBoxId = junctionBoxId;
		junctionBoxSurvey.cableDamage = cableDamage;
		junctionBoxSurvey.faultyMontageTensionWire = faultyMontageTensionWire;
		junctionBoxSurvey.faultyMontageFacade = faultyMontageFacade;
		junctionBoxSurvey.junctionBoxDamage = junctionBoxDamage;
		junctionBoxSurvey.stickerNotReadable = stickerNotReadable;
		junctionBoxSurvey.remarks = remarks;
		junctionBoxSurvey.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		junctionBoxSurvey.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		return junctionBoxSurvey;
	}
}
