import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';

import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';

@Injectable()
export class DuplicateInstallationGroupRemovalService {
	private static CLI_COMMAND = 'remove:duplicate:installation:groups';

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private readonly externalAIPGraphQLRepository: ExternalAIPGraphQLRepository,
	) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: DuplicateInstallationGroupRemovalService.CLI_COMMAND,
				description: 'description',
			},
			this.removeDuplicateInstallationGroups.bind(this),
			cli,
		);
	}

	private async removeDuplicateInstallationGroups() {
		const groupIdStart = 2011;
		const groupIdEnd = 2210;
		const total = groupIdEnd - groupIdStart + 1;
		let removedDuplicates = 0;
		this.logger.verbose(
			`Starting installation group removal: ${total} objects will have their duplicates checked and removed`,
		);

		for (let i = groupIdStart; i <= groupIdEnd; i++) {
			const name = `OVS${i}`;
			this.logger.verbose(`Checking installation group ${name}...`);
			const result = await this.externalAIPGraphQLRepository.removeDuplicateInstallationGroup(i);

			if (result) {
				removedDuplicates++;
				this.logger.verbose(`Successfully removed duplicate entries for ${name}`);
			} else {
				this.logger.verbose(`No duplicates were removed for ${name}`);
			}
		}

		this.logger.verbose(`Removed ${removedDuplicates} installation groups`);
	}
}
