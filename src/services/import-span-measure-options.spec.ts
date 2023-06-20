import fs from 'fs';

import z from 'zod';

describe('Services / ImportSpanMeasureOptions', () => {
	test('The generated normalized-data-measures.json file is valid', async () => {
		const jsonDataFilePath = 'src/schema/span-installation/types/data/normalized-data-measures.json';
		const jsonData = JSON.parse(fs.readFileSync(jsonDataFilePath, 'utf8'));

		const schema = z.object({
			spanMeasureOptions: z.array(
				z.object({
					id: z.string(),
					description: z.string(),
					decompositionItemType: z.string(),
					measureItems: z.array(
						z.object({
							id: z.string(),
							unit: z.string(),
							itemType: z.string(),
							description: z.string(),
							referenceNumber: z.string(),
						}),
					),
				}),
			),
		});

		expect(() => schema.parse(jsonData)).not.toThrow();
	});
});
