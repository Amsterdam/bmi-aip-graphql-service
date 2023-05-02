import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { PrismaService } from 'src/prisma.service';

import {
	spanMeasureItems as availableSpanMeasureItemOptions,
	spanMeasureOptions as availableSpanMeasureOptions,
} from '../schema/span-installation/types/measure-options';

@ValidatorConstraint({ name: 'optionId' })
@Injectable()
export class MeasureOptionValidation implements ValidatorConstraintInterface {
	constructor(private readonly prisma: PrismaService) {}

	async validate(value: string, args: ValidationArguments): Promise<boolean> {
		let dataSource;

		console.log(args);

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

		let keyToCheck;

		switch (args.property) {
			case 'optionId':
				keyToCheck = 'id';
				break;
			default:
				keyToCheck = args.property;
				break;
		}

		console.log(dataSource);
		console.log(keyToCheck);
		console.log(value);

		if (!dataSource.find((option) => option[keyToCheck] === value)) {
			return false;
		}

		return true;
	}

	defaultMessage(args: ValidationArguments) {
		return `Given ${args.property} is not a valid measure option.`;
	}
}
