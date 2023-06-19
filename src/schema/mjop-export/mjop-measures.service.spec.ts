import { MockedObjectDeep } from 'ts-jest';

import { MeasureService } from '../measure/measure.service';
import { FailureModeService } from '../failure-mode/failure-mode.service';
import { DefaultMaintenanceMeasureService } from '../default-maintenance-measure/default-maintenance-measure.service';
import { CyclicMeasureService } from '../measure/cyclic-measure.service';
import { DefectService } from '../ti/defect.service';
import { FailureMode } from '../failure-mode/models/failure-mode.model';
import { DefaultMaintenanceMeasure } from '../default-maintenance-measure/models/default-maintenance-measure.model';
import { PrismaService } from '../../prisma.service';
import { FailureModeRepository } from '../failure-mode/failure-mode.repository';
import { DefaultMaintenanceMeasureRepository } from '../default-maintenance-measure/default-maintenance-measure.repository';
import { DefectRepository } from '../ti/defect.repository';
import { MeasureRepository } from '../measure/measure.repository';
import { CyclicMeasureRepository } from '../measure/cyclic-measure.repository';
import { Defect } from '../ti/models/defect.model';
import { Measure } from '../measure/models/measure.model';

import { MJOPMeasuresService } from './mjop-measures.service';

jest.mock('./../failure-mode/__mocks__/failure-mode.repository');
jest.mock('./../default-maintenance-measure/__mocks__/default-maintenance-measure.repository');
jest.mock('./../ti/__mocks__/defect.repository');
jest.mock('./../measure/__mocks__/measure.repository');
jest.mock('./../measure/__mocks__/cyclic-measure.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repoFailureMode = new FailureModeRepository(prismaServiceMock);
const repoDefaultMaintenanceMeasure = new DefaultMaintenanceMeasureRepository(prismaServiceMock);
const repoDefect = new DefectRepository(prismaServiceMock);
const repoMeasure = new MeasureRepository(prismaServiceMock);
const repoCyclicMeasure = new CyclicMeasureRepository(prismaServiceMock);

describe('MjopMeasuresService', () => {
	let mjopMeasuresService: MJOPMeasuresService;
	let measureService: MeasureService;
	let cyclicMeasureService: CyclicMeasureService;
	let defectService: DefectService;
	let defaultMaintenanceMeasureService: DefaultMaintenanceMeasureService;
	let failureModeService: FailureModeService;

	beforeEach(() => {
		measureService = new MeasureService(repoMeasure);
		cyclicMeasureService = new CyclicMeasureService(repoCyclicMeasure);
		defectService = new DefectService(repoDefect);
		defaultMaintenanceMeasureService = new DefaultMaintenanceMeasureService(repoDefaultMaintenanceMeasure);
		failureModeService = new FailureModeService(repoFailureMode);
		mjopMeasuresService = new MJOPMeasuresService(
			measureService,
			cyclicMeasureService,
			defectService,
			defaultMaintenanceMeasureService,
			failureModeService,
		);
	});

	describe('mapMeasures', () => {
		it('should map measures correctly', async () => {
			// Mock dependencies
			const mockDefect: Defect = { condition: undefined, conditionId: '', id: '1', name: 'Defect', score: 5 };
			const mockFailureMode: FailureMode = {
				elementId: '',
				surveyId: '',
				unitId: '',
				id: '1',
				failureMode: 'Failure Mode',
				metaData: {},
			};
			jest.spyOn(defectService, 'getDefect').mockResolvedValue(mockDefect);
			jest.spyOn(failureModeService, 'getFailureMode').mockResolvedValue(mockFailureMode);

			// Prepare test data
			const measures = [
				{
					id: '1',
					defectId: '1',
					surveyId: '',
					unitId: '',
					failureModeId: '1',
					description: 'Measure 1',
					unitPrice: 10,
					quantity: 5,
					costSurcharge: 0.1,
					planYear: 2023,
				},
			];

			// Expected mapped measures
			const expectedMappedMeasures = [
				{
					maintenanceDescription: 'Measure 1',
					maintenanceType: undefined,
					maintenanceUnitPrice: 10,
					maintenanceCostSurcharge: 0.1,
					totalCost: 50,
					totalCostWithSurcharge: 5,
					maintenanceYear: 2023,
					defect: {
						defectName: 'Defect',
						defectScore: 5,
						// Add more expected defect properties as needed
					},
					failureMode: {},
					cyclicMaintenance: {
						year2023: 50,
					},
				},
			];

			// Map measures
			const mappedMeasures = await mjopMeasuresService.mapMeasures(measures as Measure[]);

			// Assert the mapped measures match the expected values
			expect(mappedMeasures).toEqual(expectedMappedMeasures);
		});
	});

	describe('mapCyclicMeasures', () => {
		it('should map cyclic measures correctly', async () => {
			// Mock dependencies
			const mockDefaultMaintenanceMeasure: DefaultMaintenanceMeasure = {
				id: '097ed1ba-e4f3-4a71-bae3-f06e1b95cb61s',
				description: 'Default Maintenance Measure',
			};
			const mockFailureMode: FailureMode = {
				elementId: '',
				surveyId: '',
				unitId: '',
				id: '1',
				failureMode: 'Failure Mode',
				metaData: {},
			};
			jest.spyOn(defaultMaintenanceMeasureService, 'getDefaultMaintenanceMeasure').mockResolvedValue(
				mockDefaultMaintenanceMeasure,
			);
			jest.spyOn(failureModeService, 'getFailureMode').mockResolvedValue(mockFailureMode);

			// Prepare test data
			const cyclicMeasures = [
				{
					surveyId: '',
					survey: null,
					unitId: '',
					unit: null,
					id: '1',
					defaultMaintenanceMeasureId: '1',
					failureModeId: '1',
					cycle: 1,
					unitPrice: 10,
					costSurcharge: 0.1,
					planYear: 2023,
					defaultMaintenanceMeasure: null,
					deletedAt: '',
				},
			];
			const unitQuantity = 5;

			// Expected mapped cyclic measures
			const expectedMappedCyclicMeasures = [
				{
					maintenanceDescription: 'Default Maintenance Measure',
					maintenanceType: undefined,
					maintenanceCycle: 1,
					maintenanceUnitPrice: 10,
					maintenanceCostSurcharge: 0.1,
					totalCost: 50,
					totalCostWithSurcharge: 5,
					maintenanceYear: 2023,
					failureMode: {},
					cyclicMaintenance: {
						year2023: 5,
						year2024: 5,
						year2025: 5,
						year2026: 5,
						year2027: 5,
						year2028: 5,
						year2029: 5,
						year2030: 5,
						year2031: 5,
						year2032: 5,
						year2033: 5,
						year2034: 5,
						year2035: 5,
						year2036: 5,
						year2037: 5,
						year2038: 5,
						year2039: 5,
						year2040: 5,
						year2041: 5,
						year2042: 5,
						year2043: 5,
						year2044: 5,
						year2045: 5,
						year2046: 5,
						year2047: 5,
						year2048: 5,
						year2049: 5,
						year2050: 5,
						year2051: 5,
						year2052: 5,
						year2053: 5,
						year2054: 5,
						year2055: 5,
						year2056: 5,
						year2057: 5,
						year2058: 5,
						year2059: 5,
						year2060: 5,
						year2061: 5,
						year2062: 5,
						year2063: 5,
						year2064: 5,
						year2065: 5,
						year2066: 5,
						year2067: 5,
						year2068: 5,
						year2069: 5,
						year2070: 5,
						year2071: 5,
						year2072: 5,
						year2073: 5,
						year2074: 5,
						year2075: 5,
						year2076: 5,
						year2077: 5,
						year2078: 5,
						year2079: 5,
						year2080: 5,
						year2081: 5,
						year2082: 5,
						year2083: 5,
						year2084: 5,
						year2085: 5,
						year2086: 5,
						year2087: 5,
						year2088: 5,
						year2089: 5,
						year2090: 5,
						year2091: 5,
						year2092: 5,
						year2093: 5,
						year2094: 5,
						year2095: 5,
						year2096: 5,
						year2097: 5,
						year2098: 5,
						year2099: 5,
						year2100: 5,
						year2101: 5,
						year2102: 5,
						year2103: 5,
						year2104: 5,
						year2105: 5,
						year2106: 5,
						year2107: 5,
						year2108: 5,
						year2109: 5,
						year2110: 5,
						year2111: 5,
						year2112: 5,
						year2113: 5,
						year2114: 5,
						year2115: 5,
						year2116: 5,
						year2117: 5,
						year2118: 5,
						year2119: 5,
						year2120: 5,
						year2121: 5,
						year2122: 5,
						year2123: 5,
						year2124: 5,
						year2125: 5,
						year2126: 5,
						year2127: 5,
						year2128: 5,
						year2129: 5,
						year2130: 5,
						year2131: 5,
						year2132: 5,
						year2133: 5,
						year2134: 5,
						year2135: 5,
						year2136: 5,
						year2137: 5,
						year2138: 5,
						year2139: 5,
						year2140: 5,
						year2141: 5,
						year2142: 5,
					},
				},
				// Add more expected mapped cyclic measures as needed
			];

			// Map cyclic measures
			const mappedCyclicMeasures = await mjopMeasuresService.mapCyclicMeasures(cyclicMeasures, unitQuantity);

			// Assert the mapped cyclic measures match the expected values
			expect(mappedCyclicMeasures).toEqual(expectedMappedCyclicMeasures);
		});

		it('should handle cyclic measures with cycle < 1 correctly', async () => {
			// Mock dependencies
			const mockDefaultMaintenanceMeasure: DefaultMaintenanceMeasure = {
				id: '097ed1ba-e4f3-4a71-bae3-f06e1b95cb61s',
				description: 'Default Maintenance Measure',
			};
			const mockFailureMode: FailureMode = {
				elementId: '',
				surveyId: '',
				unitId: '',
				id: '1',
				failureMode: 'Failure Mode',
				metaData: {},
			};
			jest.spyOn(defaultMaintenanceMeasureService, 'getDefaultMaintenanceMeasure').mockResolvedValue(
				mockDefaultMaintenanceMeasure,
			);
			jest.spyOn(failureModeService, 'getFailureMode').mockResolvedValue(mockFailureMode);

			// Prepare test data
			const cyclicMeasures = [
				{
					surveyId: '',
					survey: null,
					unitId: '',
					unit: null,
					id: '1',
					defaultMaintenanceMeasureId: '1',
					failureModeId: '1',
					cycle: 0.5,
					unitPrice: 10,
					costSurcharge: 0.1,
					planYear: 2023,
					defaultMaintenanceMeasure: null,
					deletedAt: '',
				},
			];
			const unitQuantity = 5;

			// Expected mapped cyclic measures
			const expectedMappedCyclicMeasures = [
				{
					maintenanceDescription: 'Default Maintenance Measure',
					maintenanceType: undefined,
					maintenanceCycle: 0.5,
					maintenanceUnitPrice: 10,
					maintenanceCostSurcharge: 0.1,
					totalCost: 50,
					totalCostWithSurcharge: 5,
					maintenanceYear: 2023,
					failureMode: {},
					cyclicMaintenance: {
						year2023: 10,
						year2024: 10,
						year2025: 10,
						year2026: 10,
						year2027: 10,
						year2028: 10,
						year2029: 10,
						year2030: 10,
						year2031: 10,
						year2032: 10,
						year2033: 10,
						year2034: 10,
						year2035: 10,
						year2036: 10,
						year2037: 10,
						year2038: 10,
						year2039: 10,
						year2040: 10,
						year2041: 10,
						year2042: 10,
						year2043: 10,
						year2044: 10,
						year2045: 10,
						year2046: 10,
						year2047: 10,
						year2048: 10,
						year2049: 10,
						year2050: 10,
						year2051: 10,
						year2052: 10,
						year2053: 10,
						year2054: 10,
						year2055: 10,
						year2056: 10,
						year2057: 10,
						year2058: 10,
						year2059: 10,
						year2060: 10,
						year2061: 10,
						year2062: 10,
						year2063: 10,
						year2064: 10,
						year2065: 10,
						year2066: 10,
						year2067: 10,
						year2068: 10,
						year2069: 10,
						year2070: 10,
						year2071: 10,
						year2072: 10,
						year2073: 10,
						year2074: 10,
						year2075: 10,
						year2076: 10,
						year2077: 10,
						year2078: 10,
						year2079: 10,
						year2080: 10,
						year2081: 10,
						year2082: 10,
						year2083: 10,
					},
				},
			];

			// Map cyclic measures
			const mappedCyclicMeasures = await mjopMeasuresService.mapCyclicMeasures(cyclicMeasures, unitQuantity);

			// Assert the mapped cyclic measures match the expected values
			expect(mappedCyclicMeasures).toEqual(expectedMappedCyclicMeasures);
		});
	});
});
