import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsGeometry(property: string, validationOptions?: ValidationOptions) {
	return function (object: unknown, propertyName: string) {
		registerDecorator({
			name: 'IsGeometry',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					function isValidWGSCoordinate(lat, lon) {
						const regexRDSLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
						const regexRDSLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

						return regexRDSLat.test(lat) && regexRDSLon.test(lon);
					}

					function isValidRDSCoordinate(x, y) {
						return !(Number(x) < 13677 || Number(x) > 278060 || Number(y) < 306628 || Number(y) > 619612);
					}

					switch (args.constraints[0]) {
						case 'wgs':
							return (
								value?.type === 'Point' &&
								isValidWGSCoordinate(value.coordinates[0], value.coordinates[1])
							);
						case 'rds':
							return (
								value?.type === 'Point' &&
								isValidRDSCoordinate(value.coordinates[0], value.coordinates[1])
							);
					}

					return false;
				},
				defaultMessage(args: ValidationArguments) {
					return `Given value for (${args.property}) is not a properly formatted geometry (${args.constraints}) field`;
				},
			},
		});
	};
}
