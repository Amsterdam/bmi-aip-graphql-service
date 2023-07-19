import { ValidationArguments } from 'class-validator';

import { spanMeasureOptions as availableSpanMeasureOptions } from '../schema/span-installation/types/measure-options';

import { MeasureOptionValidation } from './valid-measure';

describe('MeasureOptionValidation', () => {
	let measureOptionValidation: MeasureOptionValidation;

	beforeEach(() => {
		measureOptionValidation = new MeasureOptionValidation();
	});

	describe('validate', () => {
		it('should return true for a valid measure option', async () => {
			// First found spanMeasureOption in /data/normalized-data-measures.json
			const value = availableSpanMeasureOptions[0].id;

			const args = {
				targetName: 'CreateSpanMeasureInput',
				property: 'optionId',
			} as ValidationArguments;

			const isValid = await measureOptionValidation.validate(value, args);

			expect(isValid).toBe(true);
		});

		it('should return true for a valid measure item option', async () => {
			// First found spanMeasureItemOption in /data/normalized-data-measures.json
			const value = availableSpanMeasureOptions[0].measureItems[0].id;

			const args = {
				targetName: 'SpanMeasureItemInput',
				property: 'optionId',
			} as ValidationArguments;

			const isValid = await measureOptionValidation.validate(value, args);

			expect(isValid).toBe(true);
		});

		it('should return true for a valid measure item option even when it is only in the nested arrays list', async () => {
			// First found spanMeasureItemOption in /data/normalized-data-measures.json
			//const value = availableSpanMeasureItemOptions[0].id;
			const value = '32150ab1-19f1-4585-b0d3-8619f402573a';
			const args = {
				targetName: 'SpanMeasureItemInput',
				property: 'optionId',
			} as ValidationArguments;

			const isValid = await measureOptionValidation.validate(value, args);

			expect(isValid).toBe(true);
		});

		it('should return false for an invalid measure option', async () => {
			const value = 'invalidOptionId';
			const args = {
				targetName: 'CreateSpanMeasureInput',
				property: 'optionId',
			} as ValidationArguments;

			const isValid = await measureOptionValidation.validate(value, args);

			expect(isValid).toBe(false);
		});
	});

	describe('defaultMessage', () => {
		it('should return the default error message', () => {
			const args = {
				property: 'optionId',
			} as ValidationArguments;

			const message = measureOptionValidation.defaultMessage(args);

			expect(message).toBe('Given optionId is not a valid measure option.');
		});
	});
});
