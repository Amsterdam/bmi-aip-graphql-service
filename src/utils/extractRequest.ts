import { ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const extractRequest = <T = Request>(context: ExecutionContext) => {
	let request: T;

	// Check if request is coming from graphql or http
	if (context.getType() === 'http') {
		const httpContext = context.switchToHttp();
		request = httpContext.getRequest();
	} else if (context.getType<GqlContextType>() === 'graphql') {
		const gqlContext = GqlExecutionContext.create(context);
		request = gqlContext.getContext().req;
	}

	return request;
};
