import {
	SupportSystemType,
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedTensionWire,
} from '../../schema/span-installation/types';
import { SupportSystem } from '../../schema/span-installation/models/support-system.model';
import { SupportSystemFactory } from '../../schema/span-installation/support-system.factory';

import { SpanInstallationExportFactory } from './span-installation-export.factory';
import {
	passportData as passportDataStub,
	decompositionFacadeData as facadeDataStub,
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
});
