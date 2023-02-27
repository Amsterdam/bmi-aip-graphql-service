import { Injectable } from '@nestjs/common';

import { ObjectTypeUnitCodeRepository } from './object-type-unit-code.repository';
import { ObjectTypeUnitCode } from './types/object-type-unit-code.repository.interface';

@Injectable()
export class ObjectTypeUnitCodeService {
	public constructor(private readonly objectTypeUnitCodeRepository: ObjectTypeUnitCodeRepository) {}

	async getObjectTypeUnitCodeByCode(code: string): Promise<ObjectTypeUnitCode> {
		return this.objectTypeUnitCodeRepository.findByCode(code);
	}
}
