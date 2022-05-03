// @see https://github.com/getjerry/nest-casl/blob/master/src/access.guard.spec.ts

// import { Reflector } from '@nestjs/core';
// import { Test } from '@nestjs/testing';
// import { loggedInUser } from '../authentication/__stubs__/loggedInUser';
//
// describe('', () => {
// 	const req = {
// 		user: loggedInUser,
// 	};
// 	let abilityMetadata: unknown = {};
// 	let accessGuard: AccessGuard;
// 	// let accessService: AccessService;
//
// 	beforeEach(async () => {
// 		// CaslConfig.getRootOptions = jest.fn().mockImplementation(() => ({}));
//
// 		const moduleRef = await Test.createTestingModule({
// 			providers: [
// 				// AccessGuard,
// 				{ provide: Reflector, useValue: { get: jest.fn().mockImplementation(() => abilityMetadata) } },
// 				// { provide: AccessService, useValue: { canActivateAbility: jest.fn() } },
// 			],
// 		}).compile();
//
// 		accessService = moduleRef.get<AccessService>(AccessService);
// 		accessGuard = moduleRef.get<AccessGuard>(AccessGuard);
// 	});
// });
