export enum SupportSystemType {
	'tensionWire' = 'tensionWire',
	'facade' = 'facade',
	'mast' = 'mast',
	'node' = 'node',
}

export enum SupportSystemTypeDetailedTensionWire {
	'RVS316_6mm_zonder_buitenmantel' = 'RVS316 6mm zonder buitenmantel',
	'RVS316_6mm_met_buitenmantel' = 'RVS316 6mm met buitenmantel',
	'RVS316_8mm_zonder_buitenmantel' = 'RVS316 8mm zonder buitenmantel',
	'RVS316_8mm_met_buitenmantel' = 'RVS316 8mm met buitenmantel',
	'Denhalon' = 'Denhalon',
	'Aramidevezel' = 'Aramidevezel',
}

export enum SupportSystemTypeDetailedMast {
	'Spanmast' = 'Spanmast',
	'Trekmast' = 'Trekmast',
	'GVB' = 'GVB',
}

export enum SupportSystemTypeDetailedFacade {
	'Muurplaat_klassiekGietijzer' = 'Muurplaat klassiek gietijzer',
	'Muurplaat_klassiek_RVS316' = 'Muurplaat klassiek RVS316',
	'Muurplaat_klassiek_met_katrol' = 'Muurplaat klassiek met katrol',
	'Muurplaat_modern_klein_verz_staal' = 'Muurplaat modern klein verz. staal',
	'Muurplaat_modern_klein_RVS316' = 'Muurplaat modern klein RVS316',
	'Muurplaat_modern_groot_verz_staal' = 'Muurplaat modern groot verz. staal',
	'Muurplaat_modern_groot_RVS316' = 'Muurplaat modern groot RVS316',
	'Muurplaat_vierkant_200x200x5_RVS316' = 'Muurplaat vierkant 200x200x5 RVS316',
	'Muurplaat_hoekprofiel_verz_staal' = 'Muurplaat hoekprofiel verz. staal',
	'Muurplaat_inbouw_RVS' = 'Muurplaat inbouw RVS',
	'Muurplaat_gevelverlengconstructie' = 'Muurplaat gevelverlengconstructie',
	'Bevestigingspunt_maatwerk_aan_constructie' = 'Bevestigingspunt maatwerk aan constructie',
	'Schroefoog' = 'Schroefoog',
	'Overig' = 'Overig',
	// TODO complete this list (still to be provided by client)
}

export enum SupportSystemTypeDetailedNode {
	'Ring' = 'Ring',
	'Y_verbinding' = 'Y-verbinding',
}

// Translates to "Bereikbaarheid gedetailleerd"
export type SupportSystemTypeDetailed =
	| SupportSystemTypeDetailedTensionWire
	| SupportSystemTypeDetailedMast
	| SupportSystemTypeDetailedFacade
	| SupportSystemTypeDetailedNode;
