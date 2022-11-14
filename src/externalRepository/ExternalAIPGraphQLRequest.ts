import { CommandModel } from '../command/models/command.model';

export interface ExternalAIPGraphQLRequest {
	createObject?: any;
	updatePassportByObjectCode?: any;
	createSurvey?: any;
	createLuminaire?: any;
	createJunctionBox?: any;
	createSupportSystem?: any;
	undoOVSImport?: any;
	setOVSSurveySurveyors?: CommandModel;
	removeDuplicateInstallationGroup?: any;
	correctCoordinates?: any;
}
