import { facadeSurvey } from '../__stubs__';

export const FacadeSurveyService = jest.fn(() => ({
	getFacadeSurvey: jest.fn(() => facadeSurvey),
}));
