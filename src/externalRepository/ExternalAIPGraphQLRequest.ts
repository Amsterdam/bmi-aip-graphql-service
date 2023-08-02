import { SetOvsSurveySurveyorsModel } from '../command/models/set-ovs-survey-surveyors.model';
import { Nen2767MigrateDecompositionModel } from '../command/models/nen2767-migrate-decomposition.model';
import { Nen2767ObjectWithDecompositionModel } from '../command/models/nen2767-object-with-decomposition.model';
import { ObjectWithMaintenanceMeasuresModel } from '../command/models/object-with-maintenance-measures.model';
import { MigrateMaintenanceMeasuresModel } from '../command/models/migrate-maintenance-measures.model';

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
	setAdditionalPropsForOVSExport?: any;
	findObjectsWithNen2767Decomposition?: Nen2767ObjectWithDecompositionModel[];
	migrateNen2767Decomposition?: Nen2767MigrateDecompositionModel;
	objectsWithMaintenanceMeasures?: ObjectWithMaintenanceMeasuresModel[];
	migrateMaintenanceMeasures?: MigrateMaintenanceMeasuresModel;
}
