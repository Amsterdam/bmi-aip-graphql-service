import { ArkSurveyGeographyData as DomainArkSurveyGeographyData } from '../types/ark-survey-geography-data.repository.interface';
import { CreateArkSurveyGeographyDataInput } from '../dto/create-ark-survey-geography-data.input';
import { ArkSurveyGeographyDataFactory } from '../ark-survey-geography-data.factory';
import { UpdateArkSurveyGeographyDataInput } from '../dto/update-ark-survey-geography-data.input';

const arkSurveyGeographyDataRaw: Omit<DomainArkSurveyGeographyData, 'id'> = {
	surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
	ArkGeographyStart: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	ArkGeographyRDStart: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	ArkGeographyEnd: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	ArkGeographyRDEnd: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	created_at: null,
	updated_at: null,
	deleted_at: null,
};

export const createArkSurveyGeographyDataInput = Object.keys(arkSurveyGeographyDataRaw).reduce((input, key) => {
	input[key] = arkSurveyGeographyDataRaw[key];
	return input;
}, new CreateArkSurveyGeographyDataInput());

const updateArkSurveyGeographyData = new UpdateArkSurveyGeographyDataInput();
updateArkSurveyGeographyData.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateArkSurveyGeographyDataInput = Object.keys(arkSurveyGeographyDataRaw).reduce((input, key) => {
	input[key] = arkSurveyGeographyDataRaw[key];
	return input;
}, updateArkSurveyGeographyData);

export const domainArkSurveyGeographyData: DomainArkSurveyGeographyData = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...arkSurveyGeographyDataRaw,
	deleted_at: null,
};

export const ArkSurveyGeographyData =
	ArkSurveyGeographyDataFactory.createArkSurveyGeographyData(domainArkSurveyGeographyData);

export const deletedArkSurveyGeographyData: DomainArkSurveyGeographyData = {
	...domainArkSurveyGeographyData,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
