import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { SetOvsSurveySurveyorsModel } from './models/set-ovs-survey-surveyors.model';
import { SetOVSSurveySurveyorsCommand } from './commands/set-ovs-survey-surveyors.command';
import { FindObjectsWithNen2767DecompositionQuery } from './queries/find-objects-with-nen2767-decomposition.query';
import { ObjectWithNen2767DecompositionModel } from './models/object-with-nen2767-decomposition.model';
import { MigrateNen2767DecompositionModel } from './models/migrate-nen2767-decomposition.model';
import { MigrateNen2767DecompositionCommand } from './commands/migrate-nen2767-decomposition.command';

@Resolver((of) => SetOvsSurveySurveyorsModel)
export class CommandResolver {
	constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

	/**
	 * This is a mutation that is intended to only be executed once to set the surveyorCompanyId on the OVS surveys.
	 * The execution is to be done from a developer machine via the ExternalAIPGraphQLRepository interface
	 */
	@Mutation(() => SetOvsSurveySurveyorsModel, { name: 'setOVSSurveySurveyors' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async setOVSSurveySurveyors(): Promise<SetOvsSurveySurveyorsModel> {
		const result = await this.commandBus.execute<SetOVSSurveySurveyorsCommand>(new SetOVSSurveySurveyorsCommand());
		const commandModel = new SetOvsSurveySurveyorsModel();
		commandModel.done = result.done;
		commandModel.log = result.log;
		commandModel.errors = result.errors;
		commandModel.companyIds = result.companyIds;

		return commandModel;
	}

	@Query((returns) => [ObjectWithNen2767DecompositionModel], { name: 'findObjectsWithNen2767Decomposition' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async findObjectsWithNen2767Decomposition() {
		return this.queryBus.execute<FindObjectsWithNen2767DecompositionQuery>(
			new FindObjectsWithNen2767DecompositionQuery(),
		);
	}

	@Mutation((returns) => [MigrateNen2767DecompositionModel], { name: 'migrateNen2767Decomposition' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async migrateNen2767Decomposition(@Args('objectId', { type: () => String }) objectId: string) {
		return this.commandBus.execute<MigrateNen2767DecompositionCommand>(
			new MigrateNen2767DecompositionCommand(objectId),
		);
	}
}
