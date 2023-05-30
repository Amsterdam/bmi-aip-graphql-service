import { domainJunctionBox, junctionBox1, reviseJunctionBox1 } from '../__stubs__';

export const JunctionBoxRepository = jest.fn(() => ({
	createJunctionBox: jest.fn(() => junctionBox1),
	createMissingJunctionBox: jest.fn(() => reviseJunctionBox1),
	getJunctionBoxes: jest.fn(() => [domainJunctionBox]),
}));
