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
import { CorrectCoordinatesModel } from './models/correct-coordinates.model';
import { CorrectCoordinatesCommand } from './commands/correct-coordinates.command';
import { CorrectCoordinatesInput } from './dto/correct-coordinates.input';

@Resolver((of) => ObjectModel)
@Resource(ObjectModel.name)
export class ObjectResolver {
	constructor(private objectService: ObjectService, private commandBus: CommandBus) {}

	@Mutation(() => ObjectModel)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createObject(@Args('createObject') input: CreateObjectInput): Promise<ObjectModel> {
		return this.commandBus.execute<CreateObjectCommand>(new CreateObjectCommand(input));
	}

	// TMP
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

	// TMP
	@Mutation(() => CorrectCoordinatesModel)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async correctCoordinates(
		@Args('correctCoordinates') input: CorrectCoordinatesInput,
	): Promise<CorrectCoordinatesModel> {
		const result = await this.commandBus.execute<CorrectCoordinatesCommand>(new CorrectCoordinatesCommand(input));
		const response = new CorrectCoordinatesModel();
		response.success = result;
		return response;
	}
}
