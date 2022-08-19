import { luminaire1, luminaire2 } from '../__stubs__';

export const LuminaireService = jest.fn(() => ({
	getLuminaires: jest.fn(() => [luminaire1, luminaire2]),
}));
