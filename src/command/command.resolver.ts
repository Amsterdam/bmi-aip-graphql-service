import { Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { CommandModel } from './models/command.model';
import { SetOVSSurveySurveyorsCommand } from './commands/set-ovs-survey-surveyors.command';

@Resolver((of) => CommandModel)
export class CommandResolver {
	constructor(private commandBus: CommandBus) {}

	/**
	 * This is a mutation that is intended to only be executed once to set the surveyorCompanyId on the OVS surveys.
	 * The execution is to be done from a developer machine via the ExternalAIPGraphQLRepository interface
	 */
	@Mutation(() => CommandModel, { name: 'setOVSSurveySurveyors' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async setOVSSurveySurveyors(): Promise<CommandModel> {
		const result = await this.commandBus.execute<SetOVSSurveySurveyorsCommand>(new SetOVSSurveySurveyorsCommand());
		const commandModel = new CommandModel();
		commandModel.done = result.done;
		commandModel.log = result.log;
		commandModel.errors = result.errors;
		return commandModel;
	}
}
