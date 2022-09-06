import { Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';

@Injectable()
export class UpdateOVSPassport {
	private static CLI_COMMAND = 'ovs:passportUpdate';

	private static DEBUG = true;

	private graphqlClient: GraphQLClient;
}
