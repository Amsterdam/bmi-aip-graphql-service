import { Injectable } from '@nestjs/common';

import { CreateObjectInput } from './dto/create-object.input';
import { ObjectRepository } from './object.repository';
// import { ObjectFactory } from './object.factory';

@Injectable()
export class ObjectService {
	public constructor(private readonly objectRepo: ObjectRepository) {}

	async createObject(input: CreateObjectInput): Promise<CreateObjectInput> {
		return null; //ObjectFactory.CreateObject(input);
	}
}
