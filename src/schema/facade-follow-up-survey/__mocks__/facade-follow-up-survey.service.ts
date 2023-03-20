import { FacadeFollowUpSurvey } from '../__stubs__/facade-follow-up-survey-stub';

export const FaadeFollowUpSurveyService = jest.fn(() => ({
	getFacadeFollowUpSurvey: jest.fn(() => FacadeFollowUpSurvey),
}));
