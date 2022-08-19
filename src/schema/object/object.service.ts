import { Injectable } from '@nestjs/common';

import { ObjectFactory } from './object.factory';
import { CreateObjectInput } from './dto/create-object.input';
import { ObjectRepository } from './object.repository';

@Injectable()
export class ObjectService {
	public constructor(private readonly objectRepo: ObjectRepository) {}

	async createMany(input: CreateObjectInput[]): Promise<CreateObjectInput[]> {
		return ObjectFactory.createMany(input);
	}
}
