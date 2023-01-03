import { CreateArkSurveyGeographyDataInput } from '../dto/create-ark-survey-geography-data.input';

export class CreateArkSurveyGeographyDataCommand {
	public constructor(public readonly data: CreateArkSurveyGeographyDataInput) {}
}
