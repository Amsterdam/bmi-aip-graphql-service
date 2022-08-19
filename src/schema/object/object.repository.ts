import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { CreateObjectInput } from './dto/create-object.input';
import { DbObject, IObjectRepository } from './types/object.repository.interface';

@Injectable()
export class ObjectRepository implements IObjectRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createObject({ attributes }: CreateObjectInput): Promise<DbObject> {
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

	async createManyObjects(inputs: CreateObjectInput[]): Promise<number> {
		const graphqlObjects: Prisma.objectsCreateManyInput[] = [];
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const input of inputs) {
			const graphqlObject: Prisma.objectsCreateManyInput = {
				id: input.id || newId(),
				code: input.code,
				name: input.name,
				updatedOn: input.updatedOn,
				compositionIsVisible: input.compositionIsVisible,
				objectTypeId: input.objectTypeId || 'c7def16c-5791-47b5-ba01-46b3703b3e5d', //Overspaning objecttypeId
				attributes: input.attributes,
			};
			graphqlObjects.push(graphqlObject);
		}
		const dbObjects = await this.prisma.objects.createMany({ data: graphqlObjects });

		return dbObjects.count;
	}
}
