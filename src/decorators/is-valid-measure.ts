import { ValidationOptions, registerDecorator } from 'class-validator';
import { MeasureOptionValidation } from 'src/validators/valid-measure';

export function IsValidMeasureOption(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: MeasureOptionValidation,
		});
	};
}
