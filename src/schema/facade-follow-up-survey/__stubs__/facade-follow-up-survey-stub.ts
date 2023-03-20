import { UpdateFacadeFollowUpSurveyInput } from '../dto/update-facade-follow-up-survey.input';
import { FacadeFollowUpSurveyFactory } from '../facade-follow-up-survey.factory';
import { FacadeFollowUpSurvey as DomainFacadeFollowUpSurvey } from '../types/facade-follow-up-survey.repository.interface';

export const facadeFollowUpSurveyRaw: DomainFacadeFollowUpSurvey = {
	id: '9c612187-581b-4be3-902c-9e8035d1d3b7',
	preparedAuthor: '__AUTHOR_01__',
	preparedDate: undefined,
	verifiedAuthor: '__VERIVIER_01__',
	verifiedDate: undefined,
	inspectionStandardData: { remarks: '__TEST__' },
};

const updateFacadeFollowUpSurveyInputRaw = new UpdateFacadeFollowUpSurveyInput();

export const updateFacadeFollowUpSurveyInput = Object.keys(facadeFollowUpSurveyRaw).reduce((input, key) => {
	input[key] = facadeFollowUpSurveyRaw[key];
	return input;
}, updateFacadeFollowUpSurveyInputRaw);

export const FacadeFollowUpSurvey = FacadeFollowUpSurveyFactory.createFacadeFollowUpSurvey(facadeFollowUpSurveyRaw);
