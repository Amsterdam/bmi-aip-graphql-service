import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Resource } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { ObjectService } from '../object/object.service';

import { AssetObject } from './models/object.model';
import { CreateObjectInput } from './dto/create-object.input';
import { ObjectFactory } from './object.factory';
import { CreateObjectCommand } from './commands/create-object.command';
import { DbObject as DomainObject } from './types/object.repository.interface';

@Resolver((of) => AssetObject)
@Resource(AssetObject.name)
export class ObjectResolver {
	constructor(private objectService: ObjectService, private commandBus: CommandBus) {}

	@Mutation(() => AssetObject)
	public async createObject(@Args('createObject') input: CreateObjectInput): Promise<AssetObject> {
		const domainObject: DomainObject = await this.commandBus.execute<CreateObjectCommand>(
			new CreateObjectCommand(input),
		);
		return ObjectFactory.CreateObject(domainObject);
	}
}
