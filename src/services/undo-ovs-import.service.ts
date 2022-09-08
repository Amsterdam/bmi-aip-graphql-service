import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import { ConfigService } from '@nestjs/config';

import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';

@Injectable()
export class UndoOVSImportService {
	private static CLI_COMMAND = 'ovs:undo';

	private static DEBUG = true;

	private graphqlClient: GraphQLClient;

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private configService: ConfigService,
		private readonly externalAIPGraphQLRepository: ExternalAIPGraphQLRepository,
	) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: UndoOVSImportService.CLI_COMMAND,
				description: 'Removes data import with the file:read command',
			},
			this.run.bind(this),
			cli,
		);

		this.graphqlClient = new GraphQLClient(this.configService.get<string>('GRAPHQL_URL'), {
			headers: {
				Authorization: 'Bearer ' + this.configService.get<string>('AUTH_TOKEN'),
			},
		});
	}

	private async run() {
		this.logger.verbose(`Kick-off undoing OVS import...`);

		const result = await this.externalAIPGraphQLRepository.undoOVSImport();

		this.logger.log('Result:', result);
	}
}
