export type NENElement = {
	type: string;
	properties: {
		Versie: string;
		Weging: number;
		Code: string;
		GUID: string;
		Id: number;
		Description: string;
		IMGeoId: string | null;
		Valid_Till: string | null;
		LastUpdate: string;
		Revisie: number;
	};
};
