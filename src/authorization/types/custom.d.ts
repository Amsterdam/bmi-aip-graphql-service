declare namespace Express {
	export interface Request {
		user?: {
			name: string;
			preferred_username: string;
			given_name: string;
			family_name: string;
			email: string;
			realm_access: {
				roles: string[];
			};
		};
		args?: Record<string, unknown>;
	}
}
