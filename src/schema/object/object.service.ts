import { Injectable } from '@nestjs/common';

import { CreateObjectInput } from './dto/create-object.input';
import { ObjectRepository } from './object.repository';
import { ObjectFactory } from './object.factory';

@Injectable()
export class ObjectService {
	public constructor(private readonly objectRepo: ObjectRepository) {}

	async create(input: CreateObjectInput): Promise<CreateObjectInput> {
		return ObjectFactory.CreateObject(input);
	}
}
