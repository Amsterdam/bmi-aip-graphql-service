import { Luminaire } from '../../schema/span-installation/models/luminaire.model';
import { SupportSystem } from '../../schema/span-installation/models/support-system.model';
import { SupportSystemType } from '../../schema/span-installation/types';

import type {
	DecompositionFacadeData,
	DecompositionLuminaireData,
	DecompositionTensionWireData,
	DecompositionMastData,
	DecompositionNodeData,
	GeoJSONPoint,
	OVSExportSpanInstallationBaseData,
	OVSPassportData,
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
			facadeXCoordinate: (geographyRD as GeoJSONPoint).coordinates[0],
			facadeYCoordinate: (geographyRD as GeoJSONPoint).coordinates[1],
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
			mastXCoordinate: (geographyRD as GeoJSONPoint).coordinates[0],
			mastYCoordinate: (geographyRD as GeoJSONPoint).coordinates[1],
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
			nodeXCoordinate: (geographyRD as GeoJSONPoint).coordinates[0],
			nodeYCoordinate: (geographyRD as GeoJSONPoint).coordinates[1],
			nodeInstallationHeight: installationHeight,
			nodeRemarks: remarks,
		};
	}

	static CreateDecompositionLuminaireData(luminaire?: Luminaire | undefined): DecompositionLuminaireData {
		return {
			luminaireLocation: luminaire?.location ?? null,
			luminaireHasLED: luminaire?.hasLED ?? null,
			luminaireXCoordinate: luminaire?.geographyRD
				? (luminaire?.geographyRD as GeoJSONPoint).coordinates[0]
				: null,
			luminaireYCoordinate: luminaire?.geographyRD
				? (luminaire?.geographyRD as GeoJSONPoint).coordinates[1]
				: null,
			luminaireRemarks: luminaire?.remarks ?? null,
		};
	}
}
