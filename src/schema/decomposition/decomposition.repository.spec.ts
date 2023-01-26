jest.mock('./element.service');
jest.mock('./element.repository');
jest.mock('./unit.service');
jest.mock('./unit.repository');
jest.mock('./manifestation.repository');

describe('Decomposition / Repository', () => {
	describe('findPrevousSurveyId', () => {
		test('returns the id of the survey with the same objectId created prior to the given surveyId, based on the created_at field', async () => {
			// stub multiple surveys created for same objectId
			// call find previous surveyId
			// check if the correct surveyId is returned

			const result = null;
			const expected = [];
			expect(result).toBe(expected);
		});
	});

	describe('cloneDecomposition', () => {
		test('units are duplicated correctly after running the command', async () => {
			/// call cloneDecomposition for surveyId A
			// stub repository: state prior to call, state after call
			// check if the newly created units have the correct surveyId

			const result = null;
			const expected = [];
			expect(result).toBe(expected);
		});
		test('elements are duplicated correctly after running the command', async () => {
			// call cloneDecomposition for surveyId A
			// stub repository: state prior to call, state after call
			// check if the newly created elements have the correct surveyId
			// check if element records are mapped to new unit.ids

			const result = null;
			const expected = [];
			expect(result).toBe(expected);
		});
		test('manifestations are duplicated correctly after running the command', async () => {
			// call cloneDecomposition for surveyId A
			// stub repository: state prior to call, state after call
			// check if the newly created manifestations have the correct surveyId
			// check if manifestion records are mapped to new element.ids

			const result = null;
			const expected = [];
			expect(result).toBe(expected);
		});
	});
});
