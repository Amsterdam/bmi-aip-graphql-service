import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'numberWithinRange', async: false })
export class NumberWithinRange implements ValidatorConstraintInterface {
	validate(body: object[], args: ValidationArguments) {
		const [property, min, max] = args.constraints;
		let allValid = true;

		body.forEach((item) => {
			if (item[property] < min || item[property] > max) {
				allValid = false;
			}
		});

		return allValid;
	}

	defaultMessage(args: ValidationArguments) {
		return `The number field ${args.constraints[0]} must be between ${args.constraints[1]} and ${args.constraints[2]}`;
	}
}
