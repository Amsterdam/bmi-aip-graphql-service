import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { SetOvsSurveySurveyorsModel } from './models/set-ovs-survey-surveyors.model';
import { SetOVSSurveySurveyorsCommand } from './commands/set-ovs-survey-surveyors.command';
import { Nen2767FindObjectsWithDecompositionQuery } from './queries/nen2767-find-objects-with-decomposition.query';
import { Nen2767ObjectWithDecompositionModel } from './models/nen2767-object-with-decomposition.model';
import { Nen2767MigrateDecompositionModel } from './models/nen2767-migrate-decomposition.model';
import { Nen2767MigrateDecompositionCommand } from './commands/nen2767-migrate-decomposition.command';
import { FindObjectsWithMaintenanceMeasuresQuery } from './queries/find-objects-with-maintenance-measures.query';
import { ObjectWithMaintenanceMeasuresModel } from './models/object-with-maintenance-measures.model';
import { MigrateMaintenanceMeasuresModel } from './models/migrate-maintenance-measures.model';
import { MigrateMaintenanceMeasuresCommand } from './commands/migrate-maintenance-measures.command';

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

	@Query((returns) => [Nen2767ObjectWithDecompositionModel], { name: 'findObjectsWithNen2767Decomposition' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async findObjectsWithNen2767Decomposition() {
		return this.queryBus.execute<Nen2767FindObjectsWithDecompositionQuery>(
			new Nen2767FindObjectsWithDecompositionQuery(),
		);
	}

	@Mutation((returns) => Nen2767MigrateDecompositionModel, { name: 'migrateNen2767Decomposition' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async migrateNen2767Decomposition(@Args('objectId', { type: () => String }) objectId: string) {
		return this.commandBus.execute<Nen2767MigrateDecompositionCommand>(
			new Nen2767MigrateDecompositionCommand(objectId),
		);
	}

	@Query((returns) => [ObjectWithMaintenanceMeasuresModel], { name: 'objectsWithMaintenanceMeasures' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async findObjectsWithMaintenanceMeasures() {
		return this.queryBus.execute<FindObjectsWithMaintenanceMeasuresQuery>(
			new FindObjectsWithMaintenanceMeasuresQuery(),
		);
	}

	@Mutation((returns) => MigrateMaintenanceMeasuresModel, { name: 'migrateMaintenanceMeasures' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async migrateMaintenanceMeasures(@Args('objectId', { type: () => String }) objectId: string) {
		return this.commandBus.execute<MigrateMaintenanceMeasuresCommand>(
			new MigrateMaintenanceMeasuresCommand(objectId),
		);
	}
}
