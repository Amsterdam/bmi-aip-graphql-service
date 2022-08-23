import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Resource } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { ObjectService } from '../object/object.service';

import { AssetObject } from './models/object.model';
import { CreateObjectInput } from './dto/create-object.input';
import { CreateObjectCommand } from './commands/create-object.command';

@Resolver((of) => AssetObject)
@Resource(AssetObject.name)
export class ObjectResolver {
	constructor(private objectService: ObjectService, private commandBus: CommandBus) {}

	@Mutation(() => Int)
	public async createManyObjects(@Args('createObject') input: CreateObjectInput): Promise<number> {
		return this.commandBus.execute<CreateObjectCommand>(new CreateObjectCommand(input));
	}
}
