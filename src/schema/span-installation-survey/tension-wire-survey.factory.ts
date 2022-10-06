import { TensionWireSurvey as DomainTensionWireSurvey } from './types/tension-wire-survey.repository.interface';
import { TensionWireSurvey } from './models/tension-wire-survey.model';

export class TensionWireSurveyFactory {
	static CreateTensionWireSurvey({
		id,
		surveyId,
		supportSystemId,
		tensionWireDamage,
		thirdPartyObjectsAttached,
		gaffTerminalDamage,
		gaffTerminalMissingParts,
		faultyMontage,
		tensionWireClampDamage,
		remarks,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainTensionWireSurvey): TensionWireSurvey {
		const tensionWireSurvey = new TensionWireSurvey();
		tensionWireSurvey.id = id;
		tensionWireSurvey.surveyId = surveyId;
		tensionWireSurvey.supportSystemId = supportSystemId;
		tensionWireSurvey.tensionWireDamage = !!tensionWireDamage;
		tensionWireSurvey.thirdPartyObjectsAttached = !!thirdPartyObjectsAttached;
		tensionWireSurvey.gaffTerminalDamage = !!gaffTerminalDamage;
		tensionWireSurvey.gaffTerminalMissingParts = !!gaffTerminalMissingParts;
		tensionWireSurvey.faultyMontage = !!faultyMontage;
		tensionWireSurvey.tensionWireClampDamage = !!tensionWireClampDamage;
		tensionWireSurvey.remarks = remarks;
		tensionWireSurvey.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		tensionWireSurvey.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		return tensionWireSurvey;
	}
}
