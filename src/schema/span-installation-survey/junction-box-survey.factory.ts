import { JunctionBoxSurvey as DomainJunctionBoxSurvey } from './types/junction-box-survey.repository.interface';
import { JunctionBoxSurvey } from './models/junction-box-survey.model';

export class JunctionBoxSurveyFactory {
	static CreateJunctionBoxSurvey({
		id,
		surveyId,
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
		const mastSurvey = new JunctionBoxSurvey();
		mastSurvey.id = id;
		mastSurvey.surveyId = surveyId;
		mastSurvey.junctionBoxId = junctionBoxId;
		mastSurvey.cableDamage = !!cableDamage;
		mastSurvey.faultyMontageTensionWire = !!faultyMontageTensionWire;
		mastSurvey.faultyMontageFacade = !!faultyMontageFacade;
		mastSurvey.junctionBoxDamage = !!junctionBoxDamage;
		mastSurvey.stickerNotReadable = !!stickerNotReadable;
		mastSurvey.remarks = remarks;
		mastSurvey.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		mastSurvey.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		return mastSurvey;
	}
}
