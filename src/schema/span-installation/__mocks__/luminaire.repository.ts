import { domainLuminaire, luminaire1 } from '../__stubs__';

export const LuminaireRepository = jest.fn(() => ({
	createLuminaire: jest.fn(() => luminaire1),
	getLuminaires: jest.fn(() => [domainLuminaire]),
}));
