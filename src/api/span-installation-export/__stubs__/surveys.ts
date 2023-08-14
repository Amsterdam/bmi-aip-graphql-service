import { Survey } from '../../../schema/survey/models/survey.model';

export const surveysData: Pick<Survey, 'id' | 'objectId'>[] = [
	{ id: 'survey1', objectId: 'object1' },
	{ id: 'survey2', objectId: 'object2' },
];
