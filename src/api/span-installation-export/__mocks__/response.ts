import { Response } from 'express';

export const responseMock = {
	set: jest.fn(),
	send: jest.fn(),
	status: jest.fn(function (statusCode) {
		// Modify the status method to return an instance of itself
		this.statusCode = statusCode;
		return this;
	}),
	sendStatus: jest.fn(),
	links: jest.fn(),
	json: jest.fn(),
	cookie: jest.fn(),
	clearCookie: jest.fn(),
	append: jest.fn(),
	attachment: jest.fn(),
	download: jest.fn(),
	format: jest.fn(),
	get: jest.fn(),
	header: jest.fn(),
	headersSent: jest.fn(),
	locals: jest.fn(),
	location: jest.fn(),
	redirect: jest.fn(),
	render: jest.fn(),
	sendFile: jest.fn(),
	type: jest.fn(),
	vary: jest.fn(),
} as unknown as Response<any, Record<string, any>>;
