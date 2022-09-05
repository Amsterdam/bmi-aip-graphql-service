import { Injectable } from '@nestjs/common';

import { CreateObjectInput } from './dto/create-object.input';
import { ObjectRepository } from './object.repository';
import { ObjectFactory } from './object.factory';
import { ObjectModel } from './models/object.model';

@Injectable()
export class ObjectService {
	public constructor(private readonly objectRepo: ObjectRepository) {}

	async createObject(input: CreateObjectInput): Promise<ObjectModel> {
		return this.objectRepo.createObject(input);
	}

	async getObjects(objectType: string): Promise<ObjectModel[]> {
		return (await this.objectRepo.getObjectByObjectTypeId(objectType)).map((object) =>
			ObjectFactory.CreateObject(object),
		);
	}
}
