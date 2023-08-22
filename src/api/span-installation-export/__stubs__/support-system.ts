import { SupportSystem } from '../../../schema/span-installation/models/support-system.model';
import { SupportSystemType, SupportSystemTypeDetailedTensionWire } from '../../../types';

import { decompositionFacadeData } from './ovs-export-data';

const supportSystemStub = new SupportSystem();
supportSystemStub.id = '__ID__';
supportSystemStub.type = SupportSystemType.Facade;
supportSystemStub.typeDetailed = SupportSystemTypeDetailedTensionWire.Denhalon;
supportSystemStub.location = 'test';
supportSystemStub.locationIndication = 'test';
supportSystemStub.houseNumber = 'test';
supportSystemStub.installationHeight = 1;
supportSystemStub.installationLength = 1;
supportSystemStub.remarks = 'test';
supportSystemStub.geographyRD = {
	type: 'Point',
	coordinates: [12.345, 23.456],
};
supportSystemStub.createdAt = new Date().toDateString();
supportSystemStub.updatedAt = new Date().toDateString();
supportSystemStub.deletedAt = null;

for (const prop in decompositionFacadeData) {
	supportSystemStub[prop] = decompositionFacadeData[prop];
}

export { supportSystemStub };
