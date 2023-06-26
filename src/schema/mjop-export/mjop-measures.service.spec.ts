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
					failureMode: {
						analysisRemarks: undefined,
						bronVanFalen: undefined,
						faaloorzaak: undefined,
						failureModeName: undefined,
						gevolgVanFalen: undefined,
						maintenanceRemarks: undefined,
						verificationRamsA: undefined,
						verificationRamsC: undefined,
						verificationRamsEc: undefined,
						verificationRamsEnv: undefined,
						verificationRamsP: undefined,
						verificationRamsR: undefined,
						verificationRamsS: undefined,
						verificationRamsWeightedPriority: undefined,
						verificationRemarks: undefined,
					},
					cyclicMaintenance: {
						year2023: 5,
					},
				},
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
					failureMode: {
						analysisRemarks: undefined,
						bronVanFalen: undefined,
						faaloorzaak: undefined,
						failureModeName: undefined,
						gevolgVanFalen: undefined,
						maintenanceRemarks: undefined,
						verificationRamsA: undefined,
						verificationRamsC: undefined,
						verificationRamsEc: undefined,
						verificationRamsEnv: undefined,
						verificationRamsP: undefined,
						verificationRamsR: undefined,
						verificationRamsS: undefined,
						verificationRamsWeightedPriority: undefined,
						verificationRemarks: undefined,
					},
					cyclicMaintenance: {
						year2023: 5,
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
