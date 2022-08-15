import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { CreateObjectInput } from './dto/create-object.input';
import { DbObject, IObjectRepository } from './types/object.repository.interface';

@Injectable()
export class ObjectRepository implements IObjectRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createObject({ id, attributes }: CreateObjectInput): Promise<DbObject> {
		const data: Prisma.objectsCreateInput = {
			id: newId(),
			attributes,
			compositionIsVisible: false,
			objectTypes: {
				create: undefined,
				connectOrCreate: {
					where: {
						id: 'c7def16c-5791-47b5-ba01-46b3703b3e5d',
						name: 'Overspaningsinstallatie',
					},
					create: undefined,
				},
				connect: {
					id: '',
					name: '',
				},
			},
			name: '',
			updatedOn: '',
		};
		return this.prisma.objects.create({ data });
	}

	// @ts-ignore
	async createManyObjects(input: CreateObjectInput[]): Promise<DbObject> {
		// @ts-ignore
		return this.prisma.objects.createMany(input);
	}

	// async createManyObjects(data: CreateObjectInput[]): Promise<DbObject> {
	// 	return this.prisma.objects.createMany({ data });
	// }
}
