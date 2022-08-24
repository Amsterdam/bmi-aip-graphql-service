import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'apollo-server-express';

import { CreateObjectInput } from '../schema/object/dto/create-object.input';
import { ObjectModel } from '../schema/object/models/object.model';

@Injectable()
export class ExternalObjectRepository {
	public constructor(
		private readonly logger: Logger,
		private readonly configService: ConfigService,
		@InjectGraphQLClient() private readonly graphqlClient: GraphQLClient,
	) {}

	public async createObject(input: CreateObjectInput): Promise<ObjectModel> {
		const mutation = gql`
			mutation createManyObjects($createObjectInput: CreateObjectInput!) {
				createObject(createObject: $createObjectInput) {
					id
				}
			}
		`;

		let objectModel: ObjectModel;
		console.log(input);
		try {
			const result = await this.graphqlClient.request(mutation, { createObjectInput: input });
			objectModel = result.data.createObject;
			console.log(`Success`);
		} catch (e) {
			console.log(e.message);
		}

		return objectModel;
	}
}
