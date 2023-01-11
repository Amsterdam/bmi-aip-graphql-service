import { FacadeSurvey as DomainFacadeSurvey } from './types/facade-survey.repository.interface';
import { FacadeSurvey } from './models/facade-survey.model';

export class FacadeSurveyFactory {
	static CreateFacadeSurvey({
		id,
		supportSystemId,
		facadeDamageWithin1m,
		hinderingVegetation,
		wallPlateDamage,
		faultyMontage,
		nutNotFullyOverThreadedRod,
		missingFasteners,
		measuredPreload,
		appliedAdditionalTraction,
		facadeConnectionFailed,
		facadeConnectionFailureAdditionalTraction,
		remarks,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainFacadeSurvey): FacadeSurvey {
		const facadeSurvey = new FacadeSurvey();
		facadeSurvey.id = id;
		facadeSurvey.supportSystemId = supportSystemId;
		facadeSurvey.facadeDamageWithin1m = facadeDamageWithin1m;
		facadeSurvey.hinderingVegetation = hinderingVegetation;
		facadeSurvey.wallPlateDamage = wallPlateDamage;
		facadeSurvey.faultyMontage = faultyMontage;
		facadeSurvey.nutNotFullyOverThreadedRod = nutNotFullyOverThreadedRod;
		facadeSurvey.missingFasteners = missingFasteners;
		facadeSurvey.measuredPreload = typeof measuredPreload === 'number' ? measuredPreload : null;
		facadeSurvey.appliedAdditionalTraction =
			typeof appliedAdditionalTraction === 'number' ? appliedAdditionalTraction : null;
		facadeSurvey.facadeConnectionFailed = facadeConnectionFailed;
		facadeSurvey.facadeConnectionFailureAdditionalTraction =
			typeof facadeConnectionFailureAdditionalTraction === 'number'
				? facadeConnectionFailureAdditionalTraction
				: null;
		facadeSurvey.remarks = remarks;
		facadeSurvey.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		facadeSurvey.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		return facadeSurvey;
	}
}
