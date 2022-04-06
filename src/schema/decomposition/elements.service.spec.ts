import { ElementsService } from './elements.service';

describe('Decomposition / Elements / Service', () => {
	test('getElements returns array of Element objects', async () => {
		const service = new ElementsService();
		const elements = await service.getElements('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7', 113);
		expect(elements).toBeInstanceOf(Array);
		expect(elements[0]).toEqual(
			expect.objectContaining({
				id: '6d79f740-186d-4197-888e-3384fcb8cb6a',
				surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
				name: 'Kabel',
				code: 113,
			}),
		);
	});

	test('getElementById returns an Element object or undefined', async () => {
		const service = new ElementsService();
		expect(await service.getElementById('6d79f740-186d-4197-888e-3384fcb8cb6a')).toEqual(
			expect.objectContaining({
				id: '6d79f740-186d-4197-888e-3384fcb8cb6a',
				surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
				name: 'Kabel',
				code: 113,
			}),
		);
		expect(await service.getElementById('')).toBeUndefined();
	});
});
