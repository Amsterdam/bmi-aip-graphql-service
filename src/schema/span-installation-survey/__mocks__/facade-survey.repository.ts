import { domainFacadeSurvey } from '../__stubs__';

export const FacadeSurveyRepository = jest.fn(() => ({
	getFacadeSurvey: jest.fn(() => domainFacadeSurvey),
}));
