import { domainArkSurvey } from './ark-survey-stub';
import { domainReachSegment } from './reach-segment-stub';

export * from './ark-survey-stub';
export * from './reach-segment-stub';

export const domainArkSurveyWithReachSegments = {
	...domainArkSurvey,
	reachSegments: [domainReachSegment],
};
