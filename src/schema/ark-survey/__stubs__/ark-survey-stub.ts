import { SurveyFactory } from '../../survey/survey.factory';
import { domainSurvey } from '../../survey/__stubs__';

domainSurvey.inspectionStandardType = 'quaywalls';
export const arkSurveyStub = SurveyFactory.CreateSurvey(domainSurvey);
