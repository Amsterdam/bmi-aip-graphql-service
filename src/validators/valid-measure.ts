import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { PrismaService } from 'src/prisma.service';

// TODO import SpanMeasureOption array when it's available
const availableSpanMeasureOptions = [
	{
		id: '2c6806a0-c52a-23c5-08f8-6757ee5437a1',
		description: 'Span Measure Option 1',
	},
];

const availableSpanMeasureItemOptions = [
	{
		id: 'bfab1226-6b41-4cbe-81f8-9a1c69d73044',
		description: 'Span Measure Item Option 1',
	},
];

@ValidatorConstraint({ name: 'optionId' })
@Injectable()
export class MeasureOptionValidation implements ValidatorConstraintInterface {
	constructor(private readonly prisma: PrismaService) {}

	async validate(value: string, args: ValidationArguments): Promise<boolean> {
		console.log(value, args);
		let dataSource;

		switch (args.targetName) {
			case 'SpanMeasureInput':
				dataSource = availableSpanMeasureOptions;
				break;
			case 'SpanMeasureItemInput':
				dataSource = availableSpanMeasureItemOptions;
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

		if (!dataSource.find((option) => option[keyToCheck] === value)) {
			return false;
		}

		return true;
	}

	defaultMessage(args: ValidationArguments) {
		return `Given ${args.property} is not a valid measure option.`;
	}
}
