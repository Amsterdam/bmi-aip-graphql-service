import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { ObjectTypeUnitCode, IObjectTypeUnitCodeRepository } from './types/object-type-unit-code.repository.interface';

@Injectable()
export class ObjectTypeUnitCodeRepository implements IObjectTypeUnitCodeRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async findByCode(code: string): Promise<ObjectTypeUnitCode> {
		return this.prisma.objectTypeUnitCodes.findFirst({
			where: {
				code,
			},
		});
	}
}
