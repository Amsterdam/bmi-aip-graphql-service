import { GraphQLError, GraphQLFormattedError } from 'graphql';

export function badUserInputFormatter(): (error: GraphQLError) => GraphQLFormattedError {
	return (error: GraphQLError) => {
		if (error.extensions?.code === 'BAD_USER_INPUT') {
			console.log(error.extensions?.response.message);
			console.log(error.extensions);
			const extensions = {
				code: 'GRAPHQL_VALIDATION_FAILED',
				errors: [],
			};

			if (error.extensions?.response) {
				error.extensions?.response.message.forEach((item: string) => {
					extensions.errors.push(item);
				});
			}

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
