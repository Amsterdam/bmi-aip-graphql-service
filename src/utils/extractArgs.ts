import { ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const extractArgs = <T = Record<string, unknown>>(context: ExecutionContext) => {
	let args: T;

	if (context.getType() === 'http') {
		const httpContext = context.switchToHttp();
		args = httpContext.getRequest().args;
	} else if (context.getType<GqlContextType>() === 'graphql') {
		const gqlContext = GqlExecutionContext.create(context);
		args = gqlContext.getArgs();
	}

	return args;
};
