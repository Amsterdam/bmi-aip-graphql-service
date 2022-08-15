import { junctionBox1, junctionBox2 } from '../__stubs__';

export const JunctionBoxService = jest.fn(() => ({
	getJunctionBoxes: jest.fn(() => [junctionBox1, junctionBox2]),
}));
