import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Resource } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { ObjectService } from '../object/object.service';

import { AssetObject } from './models/object.model';
import { CreateObjectInput } from './dto/create-object.input';
import { CreateObjectsCommand } from './commands/create-objects.command';

@Resolver((of) => AssetObject)
@Resource(AssetObject.name)
export class ObjectResolver {
	constructor(private objectService: ObjectService, private commandBus: CommandBus) {}

	@Mutation(() => Int)
	public async createManyObjects(
		@Args('createManyObjects', { type: () => [CreateObjectInput] }) input: CreateObjectInput[],
	): Promise<number> {
		return this.commandBus.execute<CreateObjectsCommand>(new CreateObjectsCommand(input));
	}
}
