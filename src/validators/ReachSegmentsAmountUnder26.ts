import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'reachSegmentsAmountUnder26', async: false })
export class ReachSegmentsAmountUnder26 implements ValidatorConstraintInterface {
	validate(body: string, args: ValidationArguments) {
		if (args?.value?.length > 26) {
			return false;
		}

		return true;
	}

	defaultMessage(args: ValidationArguments) {
		return `The amount of segments must be under 26`;
	}
}
