import { UpdateArkSurveyGeographyDataInput } from '../dto/update-ark-survey-geography-data.input';

export class UpdateArkSurveyGeographyDataCommand {
	public constructor(public readonly data: UpdateArkSurveyGeographyDataInput) {}
}
