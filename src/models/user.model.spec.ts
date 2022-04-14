import { User } from './user.model';

describe('User / Model', () => {
	test('constructs an User instance object', () => {
		const user = new User();
		user.id = '9812a0c4-9cb4-4df2-b490-7a5653422f71';
		user.firstName = 'Tester';
		user.lastName = 'Tester';

		expect(user).toEqual(
			expect.objectContaining({
				id: '9812a0c4-9cb4-4df2-b490-7a5653422f71',
				firstName: 'Tester',
				lastName: 'Tester',
			}),
		);
	});
});
