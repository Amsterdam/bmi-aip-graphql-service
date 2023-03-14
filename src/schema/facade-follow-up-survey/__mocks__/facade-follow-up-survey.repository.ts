import { FacadeFollowUpSurvey } from '../__stubs__/facade-follow-up-survey-stub';

export const FacadeFollowUpSurveyRepository = jest.fn(() => ({
	updateFacadeFollowUpSurvey: jest.fn(() => FacadeFollowUpSurvey),
	getFacadeFollowUpSurvey: jest.fn(() => FacadeFollowUpSurvey),
}));
