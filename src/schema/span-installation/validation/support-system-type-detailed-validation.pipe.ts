import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SupportSystemTypeDetailedValidationPipe implements PipeTransform {
	transform(object, metadata) {
		console.log('VALIDATE', object);
		return object;
	}
}
