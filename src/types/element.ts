// Dummy return type for Elements service
// This will probably be redundant once the Prisma model has been created
export type DecompositionElement = {
	id: string;
	surveyId: string;
	name: string;
	code?: number;
	location?: string;
	// ... TODO
};
