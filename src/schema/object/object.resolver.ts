import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Resource } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { ObjectService } from '../object/object.service';

import { ObjectModel } from './models/object.model';
import { CreateObjectInput } from './dto/create-object.input';
import { CreateObjectCommand } from './commands/create-object.command';

@Resolver((of) => ObjectModel)
@Resource(ObjectModel.name)
export class ObjectResolver {
	constructor(private objectService: ObjectService, private commandBus: CommandBus) {}

	@Mutation(() => ObjectModel)
	public async createObject(@Args('createObject') input: CreateObjectInput): Promise<ObjectModel> {
		return this.commandBus.execute<CreateObjectCommand>(new CreateObjectCommand(input));
	}
}