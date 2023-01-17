import { GraphQLError, GraphQLFormattedError } from 'graphql';

export function badUserInputFormatter(): (error: GraphQLError) => GraphQLFormattedError {
	return (error: GraphQLError) => {
		if (error.extensions?.code === 'BAD_USER_INPUT') {
			const extensions = {
				code: 'GRAPHQL_VALIDATION_FAILED',
				errors: [],
			};

			extensions.errors.push('The values given are not valid.');

			const graphQLFormattedError: GraphQLFormattedError = {
				message: extensions.errors.join(', '),
				extensions: extensions,
			};

			return graphQLFormattedError;
		} else {
			return error;
		}
	};
}
