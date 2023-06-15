import { domainLuminaire, luminaire1, reviseLuminaire1 } from '../__stubs__';

export const LuminaireRepository = jest.fn(() => ({
	createLuminaire: jest.fn(() => luminaire1),
	createMissingLuminaire: jest.fn(() => reviseLuminaire1),
	getLuminaires: jest.fn(() => [domainLuminaire]),
}));
