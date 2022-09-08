import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { ObjectService } from './object.service';
import { ObjectModel } from './models/object.model';
import { CreateObjectInput } from './dto/create-object.input';
import { CreateObjectCommand } from './commands/create-object.command';
import { UndoOVSImportCommand } from './commands/undo-ovs-import.command';
import { UndoOVSImportModel } from './models/undoOVSImport.model';
import { RemoveDuplicateInstallationGroupCommand } from './commands/remove-duplicate-installation-group.command';
import { UpdateObjectCommand } from './commands/update-object.command';
import { UpdateObjectInput } from './dto/update-object.input';

@Resolver((of) => ObjectModel)
@Resource(ObjectModel.name)
export class ObjectResolver {
	constructor(private objectService: ObjectService, private commandBus: CommandBus) {}

	@Mutation(() => ObjectModel)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createObject(@Args('createObject') input: CreateObjectInput): Promise<ObjectModel> {
		return this.commandBus.execute<CreateObjectCommand>(new CreateObjectCommand(input));
	}

	@Mutation(() => ObjectModel)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updatePassportByObjectCode(@Args('updateObject') input: UpdateObjectInput): Promise<ObjectModel> {
		return this.commandBus.execute<UpdateObjectCommand>(new UpdateObjectCommand(input));
	}

	@Mutation(() => UndoOVSImportModel)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async undoOVSImport(): Promise<UndoOVSImportModel> {
		const result = await this.commandBus.execute<UndoOVSImportCommand>(new UndoOVSImportCommand());
		const response = new UndoOVSImportModel();
		response.success = result;
		return response;
	}

	@Mutation(() => Boolean)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async removeDuplicateInstallationGroup(
		@Args('installationGroupId') installationGroupId: number,
	): Promise<boolean> {
		return this.commandBus.execute<RemoveDuplicateInstallationGroupCommand>(
			new RemoveDuplicateInstallationGroupCommand(installationGroupId),
		);
	}
}
