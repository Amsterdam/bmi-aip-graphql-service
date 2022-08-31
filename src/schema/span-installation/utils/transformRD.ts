import * as proj4 from 'proj4';

// eslint-disable-next-line import/namespace
proj4.defs(
	'EPSG:28992',
	'+proj=sterea +lat_0=52.1561605555556 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.4171,50.3319,465.5524,1.9342,-1.6677,9.1019,4.07249999989645 +units=m +no_defs +type=crs',
);

/**
 *
 * @param {String} x
 * @param {String} y
 * @returns Array of [longitude, latitude]
 */
export function transformToRD(x: number, y: number) {
	return proj4('EPSG:28992', 'EPSG:4326').forward([x, y]);
}

/**
 *
 * @param {number} lng
 * @param {number} lat
 * @returns Array of [x, y]
 */
export function transformLatLng(lng: number, lat: number) {
	const transformed = proj4('EPSG:4326', 'EPSG:28992').forward([lng, lat]);
	return transformed;
}
