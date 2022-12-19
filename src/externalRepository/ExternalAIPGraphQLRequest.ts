import { SetOvsSurveySurveyorsModel } from '../command/models/set-ovs-survey-surveyors.model';
import { MigrateNen2767DecompositionModel } from '../command/models/migrate-nen2767-decomposition.model';
import { ObjectWithNen2767DecompositionModel } from '../command/models/object-with-nen2767-decomposition.model';

export interface ExternalAIPGraphQLRequest {
	createObject?: any;
	updatePassportByObjectCode?: any;
	createSurvey?: any;
	createLuminaire?: any;
	createJunctionBox?: any;
	createSupportSystem?: any;
	undoOVSImport?: any;
	setOVSSurveySurveyors?: SetOvsSurveySurveyorsModel;
	removeDuplicateInstallationGroup?: any;
	correctCoordinates?: any;
	findObjectsWithNen2767Decomposition?: ObjectWithNen2767DecompositionModel[];
	migrateNen2767Decomposition?: MigrateNen2767DecompositionModel;
}
