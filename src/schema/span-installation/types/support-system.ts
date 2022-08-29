export enum SupportSystemType {
	'TensionWire' = 'TensionWire',
	'Facade' = 'Facade',
	'Mast' = 'Mast',
	'Node' = 'Node',
}

export enum SupportSystemTypeDetailedTensionWire {
	'Aramidevezel' = 'Aramidevezel',
	'Denhalon' = 'Denhalon',
	'Rvs316_6mmMetBuitenmantel' = 'Rvs316_6mmMetBuitenmantel',
	'Rvs316_6mmZonderBuitenmantel' = 'Rvs316_6mmZonderBuitenmantel',
	'Rvs316_8mmMetBuitenmantel' = 'Rvs316_8mmMetBuitenmantel',
	'Rvs316_8mmZonderBuitenmantel' = 'Rvs316_8mmZonderBuitenmantel',
}

export enum SupportSystemTypeDetailedMast {
	'Spanmast' = 'Spanmast',
	'Trekmast' = 'Trekmast',
	'Gvb' = 'Gvb',
}

export enum SupportSystemTypeDetailedFacade {
	'BevestigingspuntMaatwerkAanConstructie' = 'BevestigingspuntMaatwerkAanConstructie',
	'MuurplaatGevelverlengconstructie' = 'MuurplaatGevelverlengconstructie',
	'MuurplaatHoekprofielVerzStaal' = 'MuurplaatHoekprofielVerzStaal',
	'MuurplaatInbouwRvs' = 'MuurplaatInbouwRvs',
	'MuurplaatKlassiekGietijzer' = 'MuurplaatKlassiekGietijzer',
	'MuurplaatKlassiekRvs316' = 'MuurplaatKlassiekRvs316',
	'MuurplaatKlassiekMetKatrol' = 'MuurplaatKlassiekMetKatrol',
	'MuurplaatModernGrootRvs316' = 'MuurplaatModernGrootRvs316',
	'MuurplaatModernGrootVerzStaal' = 'MuurplaatModernGrootVerzStaal',
	'MuurplaatModernKleinRvs316' = 'MuurplaatModernKleinRvs316',
	'MuurplaatModernKleinVerzStaal' = 'MuurplaatModernKleinVerzStaal',
	'MuurplaatVierkant_200x200x5Rvs316' = 'MuurplaatVierkant_200x200x5Rvs316',
	'Overig' = 'Overig',
	'Schroefoog' = 'Schroefoog',
	// TODO complete this list (still to be provided by client)
}

export enum SupportSystemTypeDetailedNode {
	'Ring' = 'Ring',
	'YVerbinding' = 'YVerbinding',
}

// Translates to "Bereikbaarheid gedetailleerd"
export type SupportSystemTypeDetailed =
	| SupportSystemTypeDetailedTensionWire
	| SupportSystemTypeDetailedMast
	| SupportSystemTypeDetailedFacade
	| SupportSystemTypeDetailedNode;
