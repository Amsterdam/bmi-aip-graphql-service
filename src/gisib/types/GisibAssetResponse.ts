export type GisibAssetResponse = {
	type: string;
	crs: {
		type: string;
		properties: {
			name: string;
		};
	};
	links: [
		{
			rel: string;
			type: string;
			title: string;
			href: string;
		},
	];
	features: [
		{
			type: string;
			geometry: {
				type: string;
				crs: string;
				coordinates: [[[]]];
			};
			properties: {
				GUID: string | null;
				'NEN Conditiescore opname': string | null;
				'NEN Conditiescore opname_DATE': string | null;
				'NEN Verzorgingsscore opname': string | null;
				'NEN Verzorgingsscore opname_DATE': string | null;
				'Type gedetailleerd': string | null;
				'Aangemaakt door': string | null;
				Aanleghoogte: string | null;
				Beheerder: string | null;
				'Beheerder gedetailleerd': string | null;
				Beheergebied: string | null;
				'Beschermde flora en fauna': string | null;
				'BGT Bronhouder': string | null;
				'BGT Eindregistratie': string | null;
				'BGT In onderzoek': string | null;
				'BGT Objecttype': string | null;
				'BGT Opmerking': string | null;
				'BGT Status': string | null;
				Breedte: string | null;
				Eigenaar: string | null;
				'Eigenaar gedetailleerd': string | null;
				Gebiedstype: string | null;
				Gebruiksfunctie: string | null;
				Gemeente: string | null;
				Grondsoort: string | null;
				Hoogte: string | null;
				'ID uit oude beheerindeling': string | null;
				Identificatie: string | null;
				'IMGeo Plusstatus': string | null;
				'Jaar uitgevoerd onderhoud': string | null;
				'Jaar van aanleg': string | null;
				Lengte: string | null;
				Leverancier: string | null;
				Ligging: string | null;
				'LV publicatiedatum': string | null;
				Materiaal: string | null;
				Memo: string | null;
				MSLINK: string | null;
				Objecttype: string | null;
				Onderhoudsplichtige: string | null;
				'Openbare ruimte': string | null;
				Opleverdatum: string | null;
				Oppervlakte: string | null;
				'Relatieve hoogteligging': string | null;
				'Theoretisch eindjaar': string | null;
				'Tijdstip registratie': string | null;
				Type: string | null;
				Verwijderdatum: string | null;
				Waterschap: string | null;
				Wijk: string | null;
				'Wijze van inwinning': string | null;
				Woonplaats: string | null;
				Zettingsgevoeligheid: string | null;
				Objectnaam: string | null;
				Objectnummer: string;
				'NEN Type beheerobject': string | null;
				Postcode: string | null;
				'Stadsdeel of kern': string | null;
				'Zettingsgevoeligheid gedetailleerd': string | null;
				Buurt: string | null;
				'Grondsoort gedetailleerd': string | null;
				'Datum inwinning': string | null;
				Vervangingsjaar: string | null;
				Code: string | null;
				Vervangingswaarde: string | null;
				Wegnummer: number | null;
				'Actueel kwaliteitsniveau': string | null;
				'BGT Type': string | null;
				Fabrikant: string | null;
				Fundering: string | null;
				'Gewenst kwaliteitsniveau': string | null;
				'IMGeo Plustype': string | null;
				Installateur: string | null;
				Kleur: string | null;
				Locatieaanduiding: string | null;
				'Type onderdeel': string | null;
				'BOR Type': string | null;
				Conditiescore: string | null;
				Beheerafspraak: {
					Id: number;
					GUID: string;
					Url: string;
					Description: string;
				};
				Deelsportcomplex: string | null;
				Inwinningsbedrijf: string | null;
				Sportterrein: string | null;
				Sportveld: string | null;
				Rangvolgorde: string | null;
				Id: number;
				Description: string | null;
				IMGeoId: string | null;
				Valid_Till: string | null;
				LastUpdate: string;
				Revisie: number;
			};
		},
	];
};
