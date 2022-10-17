import { MastSurvey as DomainMastSurvey } from './types/mast-survey.repository.interface';
import { MastSurvey } from './models/mast-survey.model';

export class MastSurveyFactory {
	static CreateMastSurvey({
		id,
		supportSystemId,
		mastDamage,
		mastMissingParts,
		tensionMastAngle,
		mastAttachmentDamage,
		mastBracketMissingParts,
		mastBracketDamage,
		remarks,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainMastSurvey): MastSurvey {
		const mastSurvey = new MastSurvey();
		mastSurvey.id = id;
		mastSurvey.supportSystemId = supportSystemId;
		mastSurvey.mastDamage = !!mastDamage;
		mastSurvey.mastMissingParts = !!mastMissingParts;
		mastSurvey.tensionMastAngle = tensionMastAngle ?? undefined;
		mastSurvey.mastAttachmentDamage = !!mastAttachmentDamage;
		mastSurvey.mastBracketMissingParts = !!mastBracketMissingParts;
		mastSurvey.mastBracketDamage = !!mastBracketDamage;
		mastSurvey.remarks = remarks;
		mastSurvey.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		mastSurvey.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		return mastSurvey;
	}
}
