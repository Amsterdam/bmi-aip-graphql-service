import {
	SupportSystemType,
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedMast,
	SupportSystemTypeDetailedNode,
	SupportSystemTypeDetailedTensionWire,
} from '../../schema/span-installation/types';
import { luminaire } from '../../schema/span-installation/__stubs__';
import {
	facadeSurvey,
	mastSurvey,
	nodeSurvey,
	tensionWireSurvey,
} from '../../schema/span-installation-survey/__stubs__';

import { SpanInstallationExportFactory } from './span-installation-export.factory';
import {
	passportData as passportDataStub,
	decompositionFacadeData as facadeDataStub,
	tensionWireData as tensionWireStub,
	mastData as mastDataStub,
	nodeData as nodeDataStub,
	luminaireData as luminaireDataStub,
	facadeSurveyData,
	mastSurveyData,
	nodeSurveyData,
	tensionWireSurveyData,
} from './__stubs__/ovs-export-data';
import { supportSystemStub } from './__stubs__/support-system';
import { SurveyFacadeData, SurveyMastData, SurveyNodeData, SurveyTensionWireData } from './types';

// Creating a new object with the same keys and null values
function nullifyValuesForObject(object: Record<string, unknown>): Record<string, null> {
	return Object.keys(object).reduce((acc, key) => {
		acc[key] = null;
		return acc;
	}, {});
}

describe('SpanInstallationExportFactory', () => {
	describe('CreatePassportData', () => {
		it('creates passport data correctly', () => {
			const input = {
				...passportDataStub,
				tramTracks: passportDataStub.passportTramTracks,
				notes: passportDataStub.passportNotes,
			};

			const result = SpanInstallationExportFactory.CreatePassportData(input);

			expect(result).toEqual(passportDataStub);
		});
	});

	describe('CreateDecompositionFacadeData', () => {
		it('creates facade decomposition data correctly', () => {
			const facadeSupportSystem = supportSystemStub;
			facadeSupportSystem.type = SupportSystemType.Facade;
			facadeSupportSystem.typeDetailed = SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs;
			facadeSupportSystem.geographyRD = {
				type: 'Point',
				coordinates: [12.345, 23.456],
			};

			const result = SpanInstallationExportFactory.CreateDecompositionFacadeData(facadeSupportSystem);

			expect(result).toEqual(facadeDataStub);
		});

		it('creates facade decomposition data correctly even if coordinates are null', () => {
			const facadeSupportSystem = supportSystemStub;
			facadeSupportSystem.type = SupportSystemType.Facade;
			facadeSupportSystem.typeDetailed = SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs;
			facadeSupportSystem.geographyRD = undefined;

			const result = SpanInstallationExportFactory.CreateDecompositionFacadeData(facadeSupportSystem);

			const expected = {
				...facadeDataStub,
				facadeXCoordinate: undefined,
				facadeYCoordinate: undefined,
			};

			expect(result).toEqual(expected);
		});

		it('returns an object with all keys present, but values set to null when support system is not of the relevant type', () => {
			const objectWithNullValues = nullifyValuesForObject(facadeDataStub);

			const result = SpanInstallationExportFactory.CreateDecompositionFacadeData();

			expect(result).toEqual(objectWithNullValues);
		});
	});

	describe('CreateDecompositionTensionWireData', () => {
		it('creates TensionWire decomposition data correctly', () => {
			const tensionWireSupportSystem = supportSystemStub;
			tensionWireSupportSystem.type = SupportSystemType.TensionWire;
			tensionWireSupportSystem.typeDetailed = SupportSystemTypeDetailedTensionWire.Denhalon;
			tensionWireSupportSystem.geographyRD = {
				type: 'Point',
				coordinates: [12.345, 23.456],
			};

			const result = SpanInstallationExportFactory.CreateDecompositionTensionWireData(tensionWireSupportSystem);

			expect(result).toEqual(tensionWireStub);
		});

		it('creates TensionWire decomposition data correctly even if coordinates are null', () => {
			const tensionWireSupportSystem = supportSystemStub;
			tensionWireSupportSystem.type = SupportSystemType.TensionWire;
			tensionWireSupportSystem.typeDetailed = SupportSystemTypeDetailedTensionWire.Denhalon;
			tensionWireSupportSystem.geographyRD = undefined;

			const result = SpanInstallationExportFactory.CreateDecompositionTensionWireData(tensionWireSupportSystem);

			expect(result).toEqual(tensionWireStub);

			const expected = {
				...tensionWireStub,
				tensionWireXCoordinate: undefined,
				tensionWireYCoordinate: undefined,
			};

			expect(result).toEqual(expected);
		});

		it('returns an object with all keys present, but values set to null when support system is not of the relevant type', () => {
			const objectWithNullValues = nullifyValuesForObject(tensionWireStub);

			const result = SpanInstallationExportFactory.CreateDecompositionTensionWireData();

			expect(result).toEqual(objectWithNullValues);
		});
	});

	describe('CreateDecompositionMastData', () => {
		it('creates Mast decomposition data correctly', () => {
			const mastSupportSystem = supportSystemStub;
			mastSupportSystem.type = SupportSystemType.Mast;
			mastSupportSystem.typeDetailed = SupportSystemTypeDetailedMast.Gvb;
			mastSupportSystem.geographyRD = {
				type: 'Point',
				coordinates: [12.345, 23.456],
			};

			const result = SpanInstallationExportFactory.CreateDecompositionMastData(mastSupportSystem);

			expect(result).toEqual(mastDataStub);
		});

		it('creates Mast decomposition data correctly even if coordinates are null', () => {
			const mastSupportSystem = supportSystemStub;
			mastSupportSystem.type = SupportSystemType.Mast;
			mastSupportSystem.typeDetailed = SupportSystemTypeDetailedMast.Gvb;
			mastSupportSystem.geographyRD = undefined;

			const result = SpanInstallationExportFactory.CreateDecompositionMastData(mastSupportSystem);

			const expected = {
				...mastDataStub,
				mastXCoordinate: undefined,
				mastYCoordinate: undefined,
			};

			expect(result).toEqual(expected);
		});

		it('returns an object with all keys present, but values set to null when support system is not of the relevant type', () => {
			const objectWithNullValues = nullifyValuesForObject(mastDataStub);

			const result = SpanInstallationExportFactory.CreateDecompositionMastData();

			expect(result).toEqual(objectWithNullValues);
		});
	});

	describe('CreateDecompositionNodeData', () => {
		it('creates Node decomposition data correctly', () => {
			const nodeSupportSystem = supportSystemStub;
			nodeSupportSystem.type = SupportSystemType.Node;
			nodeSupportSystem.typeDetailed = SupportSystemTypeDetailedNode.Ring;
			nodeSupportSystem.geographyRD = {
				type: 'Point',
				coordinates: [12.345, 23.456],
			};

			const result = SpanInstallationExportFactory.CreateDecompositionNodeData(nodeSupportSystem);

			expect(result).toEqual(nodeDataStub);
		});

		it('creates Node decomposition data correctly even if coordinates are null', () => {
			const nodeSupportSystem = supportSystemStub;
			nodeSupportSystem.type = SupportSystemType.Node;
			nodeSupportSystem.typeDetailed = SupportSystemTypeDetailedNode.Ring;
			nodeSupportSystem.geographyRD = undefined;

			const result = SpanInstallationExportFactory.CreateDecompositionNodeData(nodeSupportSystem);

			const expected = {
				...nodeDataStub,
				nodeXCoordinate: undefined,
				nodeYCoordinate: undefined,
			};

			expect(result).toEqual(expected);
		});

		it('returns an object with all keys present, but values set to null when support system is not of the relevant type', () => {
			const objectWithNullValues = nullifyValuesForObject(nodeDataStub);

			const result = SpanInstallationExportFactory.CreateDecompositionNodeData();

			expect(result).toEqual(objectWithNullValues);
		});
	});

	describe('CreateDecompositionLuminaireData', () => {
		it('creates Luminaire decomposition data correctly', () => {
			const result = SpanInstallationExportFactory.CreateDecompositionLuminaireData(luminaire);

			expect(result).toEqual(luminaireDataStub);
		});

		it('creates Luminaire decomposition data correctly even if coordinates are null', () => {
			luminaire.geographyRD = null;
			const result = SpanInstallationExportFactory.CreateDecompositionLuminaireData(luminaire);

			const expected = {
				...luminaireDataStub,
				luminaireXCoordinate: null,
				luminaireYCoordinate: null,
			};

			expect(result).toEqual(expected);
		});

		it('returns an object with all keys present, but values set to null when support system is not of the relevant type', () => {
			const objectWithNullValues = nullifyValuesForObject(luminaireDataStub);

			const result = SpanInstallationExportFactory.CreateDecompositionLuminaireData();

			expect(result).toEqual(objectWithNullValues);
		});
	});

	describe('CreateSurveyFacadeData', () => {
		it('should create Facade survey data correctly', () => {
			expect(
				SpanInstallationExportFactory.CreateSurveyFacadeData({
					...facadeSurvey,
					uploadCount: 1,
				}),
			).toEqual({
				surveyFacadeAppliedAdditionalTraction: 2,
				surveyFacadeConnectionFailureAdditionalTraction: 3,
				surveyFacadeDamageWithin1m: true,
				surveyFacadeFaultyMontage: true,
				surveyFacadeHinderingVegetation: true,
				surveyFacadeImagery: 1,
				surveyFacadeMeasuredPreload: 10,
				surveyFacadeMissingFasteners: true,
				surveyFacadeConnectionFailed: true,
				surveyFacadeNutNotFullyOverThreadedRod: true,
				surveyFacadeRemarks: '__REMARKS__',
				surveyFacadeWallPlateDamage: true,
			} as SurveyFacadeData);
		});

		it('should return an object with null values when survey argument is undefined', () => {
			expect(SpanInstallationExportFactory.CreateSurveyFacadeData()).toEqual(
				nullifyValuesForObject(facadeSurveyData),
			);
		});
	});

	describe('CreateSurveyMastData', () => {
		it('should create Mast survey data correctly', () => {
			expect(
				SpanInstallationExportFactory.CreateSurveyMastData({
					...mastSurvey,
					uploadCount: 1,
				}),
			).toEqual({
				surveyMastAttachmentDamage: true,
				surveyMastBracketDamage: true,
				surveyMastBracketMissingParts: true,
				surveyMastDamage: true,
				surveyMastImagery: 1,
				surveyMastMissingParts: true,
				surveyMastRemarks: '__REMARKS__',
				surveyTensionMastAngle: 10,
			} as SurveyMastData);
		});

		it('should return an object with null values when survey argument is undefined', () => {
			expect(SpanInstallationExportFactory.CreateSurveyMastData()).toEqual(
				nullifyValuesForObject(mastSurveyData),
			);
		});
	});

	describe('CreateSurveyTensionWireData', () => {
		it('should create TensionWire survey data correctly', () => {
			expect(
				SpanInstallationExportFactory.CreateSurveyTensionWireData({
					...tensionWireSurvey,
					uploadCount: 1,
				}),
			).toEqual({
				surveyTensionWireDamage: true,
				surveyTensionWireThirdPartyObjectsAttached: true,
				surveyTensionWireGaffTerminalDamage: true,
				surveyTensionWireGaffTerminalMissingParts: true,
				surveyTensionWireFaultyMontage: true,
				surveyTensionWireClampDamage: true,
				surveyTensionWireImagery: 1,
				surveyTensionWireRemarks: '__REMARKS__',
			} as SurveyTensionWireData);
		});

		it('should return an object with null values when survey argument is undefined', () => {
			expect(SpanInstallationExportFactory.CreateSurveyTensionWireData()).toEqual(
				nullifyValuesForObject(tensionWireSurveyData),
			);
		});
	});

	describe('CreateSurveyNodeData', () => {
		it('should create Node survey data correctly', () => {
			expect(
				SpanInstallationExportFactory.CreateSurveyNodeData({
					...nodeSurvey,
					uploadCount: 1,
				}),
			).toEqual({
				surveyNodeDamage: true,
				surveyNodeImagery: 1,
				surveyNodeRemarks: '__REMARKS__',
			} as SurveyNodeData);
		});

		it('should return an object with null values when survey argument is undefined', () => {
			expect(SpanInstallationExportFactory.CreateSurveyNodeData()).toEqual(
				nullifyValuesForObject(nodeSurveyData),
			);
		});
	});
});
