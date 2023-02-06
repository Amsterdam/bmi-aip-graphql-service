import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { FailureMode } from './models/failure-mode.model';
import { FailureModeFactory } from './failure-mode.factory';
import { FailureModeService } from './failure-mode.service';
import { CreateFailureModeInput } from './dto/create-failure-mode.input';
import { UpdateFailureModeInput } from './dto/update-failure-mode.input';
import { CreateFailureModeCommand } from './commands/create-failure-mode.command';
import { UpdateFailureModeCommand } from './commands/update-failure-mode.command';
import { FailureMode as DomainFailureMode } from './types/failure-mode.repository.interface';

@Resolver((of) => FailureMode)
@Resource(FailureMode.name)
export class FailureModeResolver {
	constructor(private failureModeService: FailureModeService, private commandBus: CommandBus) {}

	@Mutation(() => FailureMode)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createFailureMode(@Args('createFailureMode') input: CreateFailureModeInput): Promise<FailureMode> {
		const domainFailureMode: DomainFailureMode = await this.commandBus.execute<CreateFailureModeCommand>(
			new CreateFailureModeCommand(input),
		);
		return FailureModeFactory.CreateFailureMode(domainFailureMode);
	}

	@Mutation(() => FailureMode)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updateFailureMode(@Args('updateFailureMode') input: UpdateFailureModeInput): Promise<FailureMode> {
		const domainFailureMode: DomainFailureMode = await this.commandBus.execute<UpdateFailureModeCommand>(
			new UpdateFailureModeCommand(input),
		);
		return FailureModeFactory.CreateFailureMode(domainFailureMode);
	}

	@Query((returns) => [FailureMode], { name: 'failureMode' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	async getSurveyFailureModes(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.failureModeService.findFailureModes(surveyId);
	}
}
