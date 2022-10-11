import { LuminaireSurvey as DomainLuminaireSurvey } from './types/luminaire-survey.repository.interface';
import { LuminaireSurvey } from './models/luminaire-survey.model';

export class LuminaireSurveyFactory {
	static CreateLuminaireSurvey({
		id,
		luminaireId,
		luminaireDamage,
		remarks,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainLuminaireSurvey): LuminaireSurvey {
		const luminaireSurvey = new LuminaireSurvey();
		luminaireSurvey.id = id;
		luminaireSurvey.luminaireId = luminaireId;
		luminaireSurvey.luminaireDamage = !!luminaireDamage;
		luminaireSurvey.remarks = remarks;
		luminaireSurvey.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		luminaireSurvey.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		return luminaireSurvey;
	}
}
