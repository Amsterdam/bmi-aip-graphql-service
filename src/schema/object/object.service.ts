import { Injectable } from '@nestjs/common';

import { ObjectFactory } from './object.factory';
import { CreateObjectInput } from './dto/create-object.input';

@Injectable()
export class ObjectService {
	// public constructor() {}

	// async createObject(object: AssetObject) {
	// 	await ObjectFactory.CreateObject(object);
	// }

	async createMany(input: CreateObjectInput[]): Promise<CreateObjectInput[]> {
		console.log('input', input[2]);
		return ObjectFactory.createMany(input);
	}

	// async getObjects(): Promise<Object[]> {
	// 	return (await this.objectRepo.getObjects()).map((object) => ObjectFactory.CreateObject(object));
	// }
}
