import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { CreateObjectInput } from './dto/create-object.input';
import { DbObject, IObjectRepository } from './types/object.repository.interface';

@Injectable()
export class ObjectRepository implements IObjectRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createObject(input: CreateObjectInput): Promise<DbObject> {
		const data: Prisma.objectsCreateInput = {
			id: input.id,
			compositionIsVisible: input.compositionIsVisible,
			objectTypes: {
				connect: {
					id: 'c7def16c-5791-47b5-ba01-46b3703b3e5d',
					name: 'Overspaningsinstallatie',
				},
			},
			name: input.name,
			updatedOn: input.updatedOn,
		};
		return this.prisma.objects.create({ data });
	}

	async getObjectByObjectTypeId(objectTypeId: string): Promise<DbObject[]> {
		return this.prisma.objects.findMany({
			where: {
				objectTypeId,
			},
		});
	}
}
