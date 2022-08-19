import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'apollo-server-express';

import { CreateObjectInput } from '../schema/object/dto/create-object.input';

@Injectable()
export class ExternalObjectRepository {
	public constructor(
		private readonly logger: Logger,
		private readonly configService: ConfigService,
		@InjectGraphQLClient() private readonly graphqlClient: GraphQLClient,
	) {}

	public async createMany(input: CreateObjectInput[]): Promise<number> {
		const mutation = gql`
			mutation createManyObjects($createManyInput: [CreateObjectInput!]!) {
				createManyObjects(createManyObjects: $createManyInput)
			}
		`;

		console.log(`Creating many`);

		this.graphqlClient
			.request(mutation, { createAssetInput: input })
			.then(() => {
				console.log(`Success`);
			})
			.catch((reason) => {
				console.log(reason);
			});

		this.logger.verbose(`Executed migration for ${input.length} assets`);

		return input.length;
	}
}
