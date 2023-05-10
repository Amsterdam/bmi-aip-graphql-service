import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { JunctionBox } from './models/junction-box.model';
import { SupportSystem } from './models/support-system.model';
import { CloneSpanInstallationDecompositionCommand } from './commands/clone-span-installation-decomposition.command';
import { SpanDecomposition } from './models/span-decomposition.model';

@Resolver((of) => SpanDecomposition)
@Resource(SpanDecomposition.name)
export class SpanDecompositionResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => [SpanDecomposition])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async cloneSpanInstallationDecomposition(
		@Args('surveyId', { type: () => String }) surveyId: string,
		@Args('objectId', { type: () => String }) objectId: string,
	): Promise<(JunctionBox | SupportSystem)[]> {
		return this.commandBus.execute<CloneSpanInstallationDecompositionCommand>(
			new CloneSpanInstallationDecompositionCommand(objectId, surveyId),
		);
	}
}
