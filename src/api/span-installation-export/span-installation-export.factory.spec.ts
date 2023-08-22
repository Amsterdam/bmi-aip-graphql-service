import {
	SupportSystemType,
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedMast,
	SupportSystemTypeDetailedNode,
	SupportSystemTypeDetailedTensionWire,
} from '../../schema/span-installation/types';
import { SupportSystem } from '../../schema/span-installation/models/support-system.model';
import { SupportSystemFactory } from '../../schema/span-installation/support-system.factory';
import { luminaire } from '../../schema/span-installation/__stubs__';

import { SpanInstallationExportFactory } from './span-installation-export.factory';
import {
	passportData as passportDataStub,
	decompositionFacadeData as facadeDataStub,
	tensionWireData as tensionWireStub,
	mastData as mastDataStub,
	nodeData as nodeDataStub,
	luminaireData as luminaireDataStub,
} from './__stubs__/ovs-export-data';
import { supportSystemStub } from './__stubs__/support-system';

// Creating a new object with the same keys and null values
function nullifyValuesForObject(object) {
	for (const key in object) {
		object[key] = null;
	}
	return object;
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

			const result = SpanInstallationExportFactory.CreateDecompositionFacadeData(facadeSupportSystem);

			expect(result).toEqual(facadeDataStub);
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

			const result = SpanInstallationExportFactory.CreateDecompositionTensionWireData(tensionWireSupportSystem);

			expect(result).toEqual(tensionWireStub);
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

			const result = SpanInstallationExportFactory.CreateDecompositionMastData(mastSupportSystem);

			expect(result).toEqual(mastDataStub);
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

			const result = SpanInstallationExportFactory.CreateDecompositionNodeData(nodeSupportSystem);

			expect(result).toEqual(nodeDataStub);
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

		it('returns an object with all keys present, but values set to null when support system is not of the relevant type', () => {
			const objectWithNullValues = nullifyValuesForObject(luminaireDataStub);

			const result = SpanInstallationExportFactory.CreateDecompositionLuminaireData();

			expect(result).toEqual(objectWithNullValues);
		});
	});
});
