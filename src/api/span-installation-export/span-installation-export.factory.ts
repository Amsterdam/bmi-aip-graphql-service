import { JunctionBox } from '../../schema/span-installation/models/junction-box.model';
import { Luminaire } from '../../schema/span-installation/models/luminaire.model';
import { SupportSystem } from '../../schema/span-installation/models/support-system.model';
import { SupportSystemType } from '../../schema/span-installation/types';
import { FacadeSurvey } from '../../schema/span-installation-survey/models/facade-survey.model';
import { MastSurvey } from '../../schema/span-installation-survey/models/mast-survey.model';
import { NodeSurvey } from '../../schema/span-installation-survey/models/node-survey.model';
import { TensionWireSurvey } from '../../schema/span-installation-survey/models/tension-wire-survey.model';
import { LuminaireSurvey } from '../../schema/span-installation-survey/models/luminaire-survey.model';
import { JunctionBoxSurvey } from '../../schema/span-installation-survey/models/junction-box-survey.model';

import type {
	DecompositionFacadeData,
	DecompositionLuminaireData,
	DecompositionTensionWireData,
	DecompositionMastData,
	DecompositionNodeData,
	GeoJSONPoint,
	OVSExportSpanInstallationBaseData,
	OVSPassportData,
	DecompositionJunctionBoxData,
	SurveyFacadeData,
	SurveyMastData,
	SurveyNodeData,
	SurveyTensionWireData,
	SurveyLuminaireSurveyData,
	SurveyJunctionBoxData,
} from './types';

export class SpanInstallationExportFactory {
	static CreatePassportData({
		passportStreet,
		passportNeighborhood,
		passportDistrict,
		passportCityArea,
		passportSplits,
		passportDoubleWired,
		tramTracks,
		notes,
	}: OVSExportSpanInstallationBaseData['attributes']): OVSPassportData {
		return {
			passportStreet,
			passportNeighborhood,
			passportDistrict,
			passportCityArea,
			passportSplits,
			passportDoubleWired,
			passportTramTracks: tramTracks,
			passportNotes: notes,
		};
	}

	static CreateDecompositionFacadeData(supportSystem?: SupportSystem | undefined): DecompositionFacadeData {
		if (supportSystem?.type !== SupportSystemType.Facade || !supportSystem) {
			return {
				facadeTypeDetailed: null,
				facadeLocation: null,
				facadeLocationIndication: null,
				facadeHouseNumber: null,
				facadeXCoordinate: null,
				facadeYCoordinate: null,
				facadeInstallationHeight: null,
				facadeInstallationLength: null,
				facadeRemarks: null,
			};
		}

		const {
			typeDetailed,
			location,
			locationIndication,
			houseNumber,
			geographyRD,
			installationHeight,
			installationLength,
			remarks,
			type: supportSystemType,
		} = supportSystem;

		return {
			facadeTypeDetailed: typeDetailed,
			facadeLocation: location,
			facadeLocationIndication: locationIndication,
			facadeHouseNumber: houseNumber,
			facadeXCoordinate: (geographyRD as GeoJSONPoint)?.coordinates[0],
			facadeYCoordinate: (geographyRD as GeoJSONPoint)?.coordinates[1],
			facadeInstallationHeight: installationHeight,
			facadeInstallationLength: installationLength,
			facadeRemarks: remarks,
		};
	}

	static CreateDecompositionTensionWireData(supportSystem?: SupportSystem | undefined): DecompositionTensionWireData {
		if (supportSystem?.type !== SupportSystemType.TensionWire || !supportSystem) {
			return {
				tensionWireTypeDetailed: null,
				tensionWireLocation: null,
				tensionWireInstallationLength: null,
				tensionWireRemarks: null,
			};
		}

		const { typeDetailed, installationLength, location, remarks, type: supportSystemType } = supportSystem;

		return {
			tensionWireTypeDetailed: typeDetailed,
			tensionWireLocation: location,
			tensionWireInstallationLength: installationLength,
			tensionWireRemarks: remarks,
		};
	}

	static CreateDecompositionMastData(supportSystem?: SupportSystem | undefined): DecompositionMastData {
		if (supportSystem?.type !== SupportSystemType.Mast || !supportSystem) {
			return {
				mastTypeDetailed: null,
				mastLocation: null,
				mastXCoordinate: null,
				mastYCoordinate: null,
				mastInstallationHeight: null,
				mastRemarks: null,
			};
		}

		const {
			typeDetailed,
			location,
			geographyRD,
			installationHeight,
			remarks,
			type: supportSystemType,
		} = supportSystem;

		return {
			mastTypeDetailed: typeDetailed,
			mastLocation: location,
			mastXCoordinate: (geographyRD as GeoJSONPoint)?.coordinates[0],
			mastYCoordinate: (geographyRD as GeoJSONPoint)?.coordinates[1],
			mastInstallationHeight: installationHeight,
			mastRemarks: remarks,
		};
	}

	static CreateDecompositionNodeData(supportSystem?: SupportSystem | undefined): DecompositionNodeData {
		if (supportSystem?.type !== SupportSystemType.Node || !supportSystem) {
			return {
				nodeTypeDetailed: null,
				nodeLocation: null,
				nodeXCoordinate: null,
				nodeYCoordinate: null,
				nodeInstallationHeight: null,
				nodeRemarks: null,
			};
		}

		const {
			typeDetailed,
			location,
			geographyRD,
			installationHeight,
			remarks,
			type: supportSystemType,
		} = supportSystem;

		return {
			nodeTypeDetailed: typeDetailed,
			nodeLocation: location,
			nodeXCoordinate: (geographyRD as GeoJSONPoint)?.coordinates[0],
			nodeYCoordinate: (geographyRD as GeoJSONPoint)?.coordinates[1],
			nodeInstallationHeight: installationHeight,
			nodeRemarks: remarks,
		};
	}

	static CreateDecompositionLuminaireData(luminaire?: Luminaire | undefined): DecompositionLuminaireData {
		return {
			luminaireSphere: luminaire?.sphere ?? null,
			luminaireLocation: luminaire?.location ?? null,
			luminaireHasLED: luminaire?.hasLED ?? null,
			luminaireXCoordinate: luminaire?.geographyRD
				? (luminaire?.geographyRD as GeoJSONPoint)?.coordinates[0]
				: null,
			luminaireYCoordinate: luminaire?.geographyRD
				? (luminaire?.geographyRD as GeoJSONPoint)?.coordinates[1]
				: null,
			luminaireRemarks: luminaire?.remarks ?? null,
		};
	}

	static CreateDecompositionJunctionBoxData(junctionBox?: JunctionBox | undefined): DecompositionJunctionBoxData {
		return {
			junctionBoxTechviewId: junctionBox?.techViewId ?? null,
			junctionBoxMastId: junctionBox?.mastId ?? null,
			junctionBoxMastNumber: junctionBox?.mastNumber ?? null,
			junctionBoxXCoordinate: junctionBox?.geographyRD
				? (junctionBox?.geographyRD as GeoJSONPoint)?.coordinates[0]
				: null,
			junctionBoxYCoordinate: junctionBox?.geographyRD
				? (junctionBox?.geographyRD as GeoJSONPoint)?.coordinates[1]
				: null,
			junctionBoxInstallationHeight: junctionBox?.installationHeight ?? null,
			junctionBoxRiserTubeVisible: junctionBox?.riserTubeVisible ?? null,
			junctionBoxLocation: junctionBox?.location ?? null,
		};
	}

	static CreateSurveyJunctionBoxData(survey?: JunctionBoxSurvey & { uploadCount: number }): SurveyJunctionBoxData {
		return {
			surveyJunctionBoxCableDamage: survey?.cableDamage ?? null,
			surveyJunctionBoxFaultyMontageTensionWire: survey?.faultyMontageTensionWire ?? null,
			surveyJunctionBoxFaultyMontageFacade: survey?.faultyMontageFacade ?? null,
			surveyJunctionBoxDamage: survey?.junctionBoxDamage ?? null,
			surveyJunctionBoxStickerNotReadable: survey?.stickerNotReadable ?? null,
			surveyJunctionBoxRemarks: survey?.remarks ?? null,
			surveyJunctionBoxImagery: survey?.uploadCount ?? null,
		};
	}

	static CreateSurveyFacadeData(survey?: FacadeSurvey & { uploadCount: number }): SurveyFacadeData {
		return {
			surveyFacadeDamageWithin1m: survey?.facadeDamageWithin1m ?? null,
			surveyFacadeHinderingVegetation: survey?.hinderingVegetation ?? null,
			surveyFacadeWallPlateDamage: survey?.wallPlateDamage ?? null,
			surveyFacadeFaultyMontage: survey?.faultyMontage ?? null,
			surveyFacadeNutNotFullyOverThreadedRod: survey?.nutNotFullyOverThreadedRod ?? null,
			surveyFacadeMissingFasteners: survey?.missingFasteners ?? null,
			surveyFacadeMeasuredPreload: survey?.measuredPreload ?? null,
			surveyFacadeAppliedAdditionalTraction: survey?.appliedAdditionalTraction ?? null,
			surveyFacadeConnectionFailed: survey?.facadeConnectionFailed ?? null,
			surveyFacadeConnectionFailureAdditionalTraction: survey?.facadeConnectionFailureAdditionalTraction ?? null,
			surveyFacadeImagery: survey?.uploadCount ?? null,
			surveyFacadeRemarks: survey?.remarks ?? null,
		};
	}

	static CreateSurveyMastData(survey?: MastSurvey & { uploadCount: number }): SurveyMastData {
		return {
			surveyMastDamage: survey?.mastDamage ?? null,
			surveyMastMissingParts: survey?.mastMissingParts ?? null,
			surveyTensionMastAngle: survey?.tensionMastAngle ?? null,
			surveyMastAttachmentDamage: survey?.mastAttachmentDamage ?? null,
			surveyMastBracketMissingParts: survey?.mastBracketMissingParts ?? null,
			surveyMastBracketDamage: survey?.mastBracketDamage ?? null,
			surveyMastImagery: survey?.uploadCount ?? null,
			surveyMastRemarks: survey?.remarks ?? null,
		};
	}

	static CreateSurveyTensionWireData(survey?: TensionWireSurvey & { uploadCount: number }): SurveyTensionWireData {
		return {
			surveyTensionWireDamage: survey?.tensionWireDamage ?? null,
			surveyTensionWireThirdPartyObjectsAttached: survey?.thirdPartyObjectsAttached ?? null,
			surveyTensionWireGaffTerminalDamage: survey?.gaffTerminalDamage ?? null,
			surveyTensionWireGaffTerminalMissingParts: survey?.gaffTerminalMissingParts ?? null,
			surveyTensionWireFaultyMontage: survey?.faultyMontage ?? null,
			surveyTensionWireClampDamage: survey?.tensionWireClampDamage ?? null,
			surveyTensionWireImagery: survey?.uploadCount ?? null,
			surveyTensionWireRemarks: survey?.remarks ?? null,
		};
	}

	static CreateSurveyLuminaireData(survey?: LuminaireSurvey & { uploadCount: number }): SurveyLuminaireSurveyData {
		return {
			surveyLuminaireDamage: survey?.luminaireDamage ?? null,
			surveyLuminaireImagery: survey?.uploadCount ?? null,
			surveyLuminaireRemarks: survey?.remarks ?? null,
		};
	}

	static CreateSurveyNodeData(survey?: NodeSurvey & { uploadCount: number }): SurveyNodeData {
		return {
			surveyNodeDamage: survey?.nodeDamage ?? null,
			surveyNodeImagery: survey?.uploadCount ?? null,
			surveyNodeRemarks: survey?.remarks ?? null,
		};
	}
}
