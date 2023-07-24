export type DmsResponse = {
	guid: string;
	name: string;
	mime_type: string;
	extension: string;
	pid: string;
	url: string;
	rawMetadata: {
		'survey-id-overspanning': string;
		datum: string;
		'ingenieursbureau-bruggen': string;
		actueel: string;
		'bron-bruggen': string;
		vertrouwelijkheid: string;
		tekeningdocumentomschrijving: string;
	};
	'bron-bruggen': string;
	ingenieursbureau: string;
	vertrouwelijkheid: string;
	documentomschrijving: string;
	datum: string;
	'survey-id': string;
};
