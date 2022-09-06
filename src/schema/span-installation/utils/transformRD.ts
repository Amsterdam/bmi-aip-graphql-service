import * as proj4 from 'proj4';

/**
 * @see https://epsg.io/4326
 * @see https://epsg.io/28992
 */

// eslint-disable-next-line import/namespace
proj4.defs(
	'EPSG:28992',
	'+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +vunits=m +no_defs',
);

/**
 * Transforms "Amersfoort RD" coordinates to "World Geodetic System 1984" lon/lat
 */
export function transformRDToWGS(coordinates: [number, number]): [number, number] {
	return proj4('EPSG:28992', 'EPSG:4326').forward(coordinates);
}

/**
 * Transforms "World Geodetic System 1984" lon/lat coordinates to "Amersfoort RD"
 */
export function transformWGSToRD(coordinates: [number, number]): [number, number] {
	return proj4('EPSG:4326', 'EPSG:28992').forward(coordinates);
}
