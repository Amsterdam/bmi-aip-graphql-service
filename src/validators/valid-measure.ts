import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

import {
	spanMeasureItems as availableSpanMeasureItemOptions,
	spanMeasureOptions as availableSpanMeasureOptions,
} from '../schema/span-installation/types/measure-options';

@ValidatorConstraint({ name: 'optionId' })
@Injectable()
export class MeasureOptionValidation implements ValidatorConstraintInterface {
	async validate(value: string, args: ValidationArguments): Promise<boolean> {
		let dataSource;
		switch (args.targetName) {
			case 'CreateSpanMeasureInput':
				dataSource = availableSpanMeasureOptions;
				break;
			case 'SpanMeasureItemInput':
				dataSource = availableSpanMeasureItemOptions;
				break;
			default:
				throw new Error('Decorator applied to unspecified target.');
				break;
		}

		for (const item of dataSource) {
			if (item.id === value) {
				return true;
			}
		}

		return false;
	}

	defaultMessage(args: ValidationArguments) {
		return `Given ${args.property} is not a valid measure option.`;
	}
}
