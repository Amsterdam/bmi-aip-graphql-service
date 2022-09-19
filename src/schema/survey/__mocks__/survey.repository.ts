import { domainJunctionBox, junctionBox1 } from '../__stubs__';

export const JunctionBoxRepository = jest.fn(() => ({
	createJunctionBox: jest.fn(() => junctionBox1),
	getJunctionBoxes: jest.fn(() => [domainJunctionBox]),
}));
