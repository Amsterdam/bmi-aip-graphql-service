-- CreateEnum
CREATE TYPE "degreeOfDamage" AS ENUM ('Matig aangetast', 'Licht aangetast');

-- CreateTable
CREATE TABLE "assetRemarks" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "remarkedOn" TIMESTAMPTZ(6) NOT NULL,
    "assetId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "remarkedBy" VARCHAR(255) NOT NULL,

    CONSTRAINT "assetRemarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "filenameThumbnail" VARCHAR(255),
    "date" TIMESTAMPTZ(6) NOT NULL,
    "size" BIGINT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "isInConditionReport" BOOLEAN NOT NULL,
    "pixelDistance" BIGINT NOT NULL,
    "elementId" UUID,
    "unitId" UUID,
    "defectId" UUID,
    "surveyId" UUID,
    "imageMeasurementId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "objectId" UUID NOT NULL,
    "fileExtension" VARCHAR(255) NOT NULL,
    "order" BIGINT NOT NULL DEFAULT 0,
    "derivedFromAssetId" UUID,
    "downscaleStatus" TEXT,
    "downscaleJobId" VARCHAR(255),
    "derivedStartTimestamp" DECIMAL(12,3),
    "derivedEndTimestamp" DECIMAL(12,3),
    "description" VARCHAR(255),
    "downscaleStatusLow" TEXT,
    "downscaleJobLowId" VARCHAR(255),
    "downscaleStatusHigh" TEXT,
    "downscaleJobHighId" VARCHAR(255),
    "manifestationId" UUID,
    "isInMSWordReport" BOOLEAN DEFAULT false,
    "is2dSource" BOOLEAN DEFAULT false,
    "failureModeId" UUID,
    "isOnReportStartPage" BOOLEAN DEFAULT false,
    "uid" UUID,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditEvents" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "objectId" UUID,
    "surveyId" UUID,
    "action" VARCHAR(255) NOT NULL,
    "createdOnDateTime" TIMESTAMPTZ(6) NOT NULL,
    "ipAddress" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "externalUserId" VARCHAR(255),

    CONSTRAINT "auditEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batchDocuments" (
    "id" UUID NOT NULL,
    "batchId" UUID,
    "filename" VARCHAR(255) NOT NULL,
    "filesize" INTEGER NOT NULL,
    "filetype" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "batchDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batches" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) DEFAULT E'open',
    "startDate" TIMESTAMPTZ(6),
    "endDate" TIMESTAMPTZ(6),
    "clientCompanyId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "plannedStartDate" DATE,
    "plannedEndDate" DATE,
    "contractId" UUID,
    "tranchId" UUID,
    "remarks" TEXT,
    "legacyFailureMode" BOOLEAN,
    "inspectionStandardTypes" JSON,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batchExecutorCompanies" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "batchId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "batchExecutorCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batchObjects" (
    "id" UUID NOT NULL,
    "objectId" UUID,
    "batchId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "batchObjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255),
    "state" VARCHAR(255),
    "city" VARCHAR(255),
    "zip" VARCHAR(255),
    "country" VARCHAR(255),
    "storageLimit" BIGINT NOT NULL DEFAULT 0,
    "storageUsed" BIGINT NOT NULL DEFAULT 0,
    "registeredOn" TIMESTAMPTZ(6) NOT NULL,
    "status" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "isClient" BOOLEAN NOT NULL DEFAULT false,
    "customerVersion" VARCHAR(255) DEFAULT E'all',
    "supportEmail" VARCHAR(255),
    "isDemoAccount" BOOLEAN DEFAULT false,
    "wfsKey" VARCHAR(255),
    "authenticationToken" VARCHAR(255),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companyRelations" (
    "managedById" UUID NOT NULL,
    "managesId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6)
);

-- CreateTable
CREATE TABLE "companyUsages" (
    "id" UUID NOT NULL,
    "storageUsed" BIGINT NOT NULL DEFAULT 0,
    "objectsCount" BIGINT NOT NULL DEFAULT 0,
    "createdOn" DATE NOT NULL,
    "companyId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "companyUsages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conditions" (
    "id" UUID NOT NULL,
    "advice" TEXT NOT NULL,
    "cost" DOUBLE PRECISION,
    "costYear" INTEGER,
    "surveyId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "elementId" UUID,
    "unitId" UUID,
    "score" VARCHAR(1),
    "manifestationId" UUID,
    "careScore" VARCHAR(1),
    "investigationPriority" VARCHAR(1),
    "craInspectionRemarks" TEXT,
    "craInitialScore" INTEGER,
    "craHistoryScore" INTEGER,
    "craInspectionScore" INTEGER,
    "craInitialRemarks" TEXT,
    "craHistoryRemarks" TEXT,
    "craInitialUnityCheck" DECIMAL(15,6),
    "craHistoryUnityCheck" DECIMAL(15,6),
    "ramsMaxTotalPriority" VARCHAR(2),
    "ramsMaxWeightedPriority" VARCHAR(1),
    "isFurtherInvestigation" BOOLEAN,

    CONSTRAINT "conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "batchPrefix" VARCHAR(255),
    "status" VARCHAR(255) DEFAULT E'open',
    "inspectionStandardType" VARCHAR(255),
    "startDate" TIMESTAMPTZ(6),
    "endDate" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dataSets" (
    "id" UUID NOT NULL,
    "dataType" VARCHAR(32),
    "value" VARCHAR(255),

    CONSTRAINT "dataSets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defaultFailureModes" (
    "id" UUID NOT NULL,
    "objectTypeUnitCodeId" UUID,
    "name" VARCHAR(255),
    "isActive" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "defaultFailureModes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defaultMaintenanceMeasures" (
    "id" UUID NOT NULL,
    "objectTypeUnitCodeId" UUID,
    "material" VARCHAR(255),
    "description" VARCHAR(255),
    "cycle" DOUBLE PRECISION,
    "maintenanceType" VARCHAR(255),
    "quantityUnitOfMeasurement" VARCHAR(255),
    "unitPrice" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "defaultMaintenanceMeasures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defects" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "code" VARCHAR(255),
    "description" TEXT,
    "seriousness" INTEGER,
    "intensity" INTEGER,
    "extend" INTEGER,
    "conditionId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "repairAdviceCategory" TEXT,
    "repairDate" TIMESTAMPTZ(6),
    "material" VARCHAR(255),
    "cause" VARCHAR(255),
    "aspect" VARCHAR(255),
    "repairAdvice" VARCHAR(255),
    "amount" INTEGER,
    "amountTotal" INTEGER,
    "measuringUnit" VARCHAR(255),
    "measuringUnitAbbreviation" VARCHAR(255),
    "score" INTEGER,
    "defectType" VARCHAR(255),
    "locationDescription" VARCHAR(255),
    "details" TEXT,
    "riscLevel" VARCHAR(255),
    "ramsR" VARCHAR(1),
    "ramsA" VARCHAR(1),
    "ramsM" VARCHAR(1),
    "ramsS" VARCHAR(1),
    "careScore" INTEGER,
    "ramsEc" VARCHAR(1),
    "ramsEnv" VARCHAR(1),
    "ramsTotalPriority" VARCHAR(2),
    "ramsWeightedPriority" VARCHAR(1),

    CONSTRAINT "defects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "derivedConditionScores" (
    "id" UUID NOT NULL,
    "elementId" UUID,
    "unitId" UUID,
    "manifestationId" UUID,
    "surveyId" UUID,
    "score" VARCHAR(1),
    "derivedScore" VARCHAR(1),
    "replacementIndex" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "careScore" VARCHAR(1),
    "derivedCareScore" VARCHAR(1),

    CONSTRAINT "derivedConditionScores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "elementCategories" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "languageId" UUID NOT NULL,
    "inspectionStandardId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "isActive" BOOLEAN DEFAULT true,

    CONSTRAINT "elementCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "elementRemarks" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "remarkedOn" TIMESTAMPTZ(6) NOT NULL,
    "elementId" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "remarkedBy" VARCHAR(255) NOT NULL,

    CONSTRAINT "elementRemarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "elements" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255),
    "location" VARCHAR(255),
    "objectId" UUID NOT NULL,
    "conditionId" UUID,
    "observationPointId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "categoryId" UUID,
    "isUtResultPlaceholder" BOOLEAN NOT NULL DEFAULT false,
    "isStructural" BOOLEAN NOT NULL DEFAULT false,
    "constructionYear" INTEGER,
    "constructionType" VARCHAR(255),
    "elementGroupName" VARCHAR(255),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isElectrical" BOOLEAN NOT NULL DEFAULT false,
    "isStructuralObjectSpecific" BOOLEAN NOT NULL DEFAULT false,
    "isElectricalObjectSpecific" BOOLEAN NOT NULL DEFAULT false,
    "isElementGroupNameObjectSpecific" BOOLEAN NOT NULL DEFAULT false,
    "isRelevant" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failureModeDocuments" (
    "documentId" UUID NOT NULL,
    "failureModeId" UUID NOT NULL,

    CONSTRAINT "failureModeDocuments_pkey" PRIMARY KEY ("documentId","failureModeId")
);

-- CreateTable
CREATE TABLE "failureModes" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "elementId" UUID NOT NULL,
    "unitId" UUID,
    "manifestationId" UUID,
    "customName" VARCHAR(255),
    "metaData" JSONB,
    "analysisRemarks" TEXT,
    "verificationRemarks" TEXT,
    "maintenanceRemarks" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "defaultFailureModeId" UUID,
    "analysisRamsR" VARCHAR(1),
    "analysisRamsA" VARCHAR(1),
    "analysisRamsS" VARCHAR(1),
    "analysisRamsC" VARCHAR(1),
    "analysisRamsEc" VARCHAR(1),
    "analysisRamsEnv" VARCHAR(1),
    "analysisRamsP" VARCHAR(1),
    "verificationRamsR" VARCHAR(1),
    "verificationRamsA" VARCHAR(1),
    "verificationRamsS" VARCHAR(1),
    "verificationRamsC" VARCHAR(1),
    "verificationRamsEc" VARCHAR(1),
    "verificationRamsEnv" VARCHAR(1),
    "verificationRamsP" VARCHAR(1),
    "maintenanceRamsR" VARCHAR(1),
    "maintenanceRamsA" VARCHAR(1),
    "maintenanceRamsS" VARCHAR(1),
    "maintenanceRamsC" VARCHAR(1),
    "maintenanceRamsEc" VARCHAR(1),
    "maintenanceRamsEnv" VARCHAR(1),
    "maintenanceRamsP" VARCHAR(1),
    "analysisRamsTotalPriority" VARCHAR(2),
    "verificationRamsTotalPriority" VARCHAR(2),
    "maintenanceRamsTotalPriority" VARCHAR(2),
    "analysisRamsWeightedPriority" VARCHAR(1),
    "verificationRamsWeightedPriority" VARCHAR(1),
    "maintenanceRamsWeightedPriority" VARCHAR(1),
    "copyOfFailureModeId" UUID,
    "surveyScopeId" INTEGER,
    "failureModeType" VARCHAR(255) DEFAULT E'Constante faalfrequentie',
    "function" UUID,
    "guideword" UUID,
    "failureMode" UUID,
    "causeOfFailure" UUID,
    "sourceOfFailure" UUID,
    "consequenceOfFailure" VARCHAR(255),
    "noticableFailure" VARCHAR(4),

    CONSTRAINT "failureModes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "findings" (
    "id" UUID NOT NULL,
    "failureModeId" UUID NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "surveyScopeId" INTEGER,
    "surveyId" UUID,

    CONSTRAINT "findings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finishedJobs" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "jobType" VARCHAR(255) NOT NULL,
    "payload" JSONB NOT NULL,
    "startedOnDateTime" TIMESTAMPTZ(6),
    "wasSuccessful" BOOLEAN,
    "errorLog" TEXT,
    "log" TEXT,
    "workerId" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "finishedJobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flights" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "startedOnDateTime" TIMESTAMPTZ(6),
    "takenOffDateTime" TIMESTAMPTZ(6),
    "updatedOnDateTime" TIMESTAMPTZ(6) NOT NULL,
    "createdOnDateTime" TIMESTAMPTZ(6) NOT NULL,
    "indexNumber" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fmecaFurtherInvestigations" (
    "id" UUID NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "priority" INTEGER NOT NULL,
    "failureModeId" UUID,
    "surveyId" UUID NOT NULL,
    "unitId" UUID NOT NULL,
    "manifestationId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "surveyScopeId" INTEGER,

    CONSTRAINT "fmecaFurtherInvestigations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imageMeasurements" (
    "id" UUID NOT NULL,
    "distanceToObject" BIGINT NOT NULL,
    "zoomLevel" INTEGER,
    "imagePositionX" INTEGER,
    "imagePositionY" INTEGER,
    "isRulerVisible" BOOLEAN NOT NULL,
    "rulerX" INTEGER,
    "rulerY" INTEGER,
    "isCrackRulerVisible" BOOLEAN NOT NULL,
    "crackRulerX" INTEGER,
    "crackRulerY" INTEGER,
    "creackRulerOrientation" VARCHAR(255),
    "assetId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "imageMeasurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspectionFindings" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "description" TEXT,
    "unitId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "inspectionFindings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspectionPlans" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "unitId" UUID,
    "manifestationId" UUID,
    "surveyScopeId" INTEGER,

    CONSTRAINT "inspectionPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspectionStandards" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isCheckList" BOOLEAN NOT NULL,
    "languageId" UUID NOT NULL,
    "objectTypeId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "type" VARCHAR(255) DEFAULT E'free',
    "isActive" BOOLEAN DEFAULT true,

    CONSTRAINT "inspectionStandards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "jobType" VARCHAR(255) NOT NULL,
    "payload" JSONB NOT NULL,
    "startedOnDateTime" TIMESTAMPTZ(6),
    "updatedOnDateTime" TIMESTAMPTZ(6),
    "workerId" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knex_migrations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "batch" INTEGER,
    "migration_time" TIMESTAMPTZ(6),

    CONSTRAINT "knex_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knex_migrations_lock" (
    "is_locked" INTEGER
);

-- CreateTable
CREATE TABLE "languages" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licences" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "activatedOnDate" DATE,
    "expiresOnDate" DATE,
    "name" VARCHAR(255) NOT NULL,
    "isInUseByDeviceName" VARCHAR(255),
    "activatedBy" VARCHAR(255),

    CONSTRAINT "licences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenanceMeasures" (
    "id" UUID NOT NULL,
    "failureModeId" UUID,
    "description" TEXT,
    "cost" DOUBLE PRECISION,
    "planYear" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "unitId" UUID,
    "manifestationId" UUID,
    "surveyId" UUID,
    "workType" VARCHAR(255),
    "maintenanceType" VARCHAR(255),
    "urgency" VARCHAR(255),
    "finalPlanYear" INTEGER,
    "defaultMaintenanceMeasureId" UUID,
    "cycle" DOUBLE PRECISION,
    "unitPrice" DOUBLE PRECISION,
    "costSurcharge" DOUBLE PRECISION,
    "objectId" UUID NOT NULL,
    "scheduledYear" INTEGER,
    "implementationYear" INTEGER,
    "planYearRemarks" TEXT,
    "scheduledYearRemarks" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "previousMaintenanceMeasureId" UUID,
    "defectId" UUID,
    "location" VARCHAR(255),
    "quantity" VARCHAR(255),
    "surveyScopeId" INTEGER,
    "remarks" TEXT,
    "quantityUnitOfMeasurement" VARCHAR(4),
    "netCost" DOUBLE PRECISION,

    CONSTRAINT "maintenanceMeasures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manifestationRemarks" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "remarkedOn" TIMESTAMPTZ(6) NOT NULL,
    "remarkedBy" VARCHAR(255) NOT NULL,
    "manifestationId" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "manifestationRemarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manifestations" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255),
    "location" VARCHAR(255),
    "elementId" UUID NOT NULL,
    "unitId" UUID NOT NULL,
    "conditionId" UUID,
    "observationPointId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "objectId" UUID NOT NULL,
    "material" VARCHAR(128),
    "quantity" INTEGER,
    "quantityUnitOfMeasurement" VARCHAR(4),
    "constructionYear" INTEGER,

    CONSTRAINT "manifestations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurementCandidates" (
    "id" UUID NOT NULL,
    "flightId" UUID NOT NULL,
    "measurementId" UUID NOT NULL,
    "value" REAL NOT NULL,
    "altitude" REAL,
    "updatedOnDateTime" TIMESTAMPTZ(6) NOT NULL,
    "createdOnDateTime" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "measurementCandidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurements" (
    "id" UUID NOT NULL,
    "flightId" UUID NOT NULL,
    "indexNumber" INTEGER NOT NULL,
    "positionNumber" INTEGER NOT NULL,
    "scanLineNumber" INTEGER NOT NULL,
    "value" REAL NOT NULL,
    "altitude" REAL,
    "updatedOnDateTime" TIMESTAMPTZ(6) NOT NULL,
    "createdOnDateTime" TIMESTAMPTZ(6) NOT NULL,
    "pointNumber" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mutationQueue" (
    "id" UUID NOT NULL,
    "objectId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT E'QUEUED',

    CONSTRAINT "mutationQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nenDefects" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "code" VARCHAR(255),
    "description" VARCHAR(255),
    "seriousness" VARCHAR(255),
    "intensity" VARCHAR(255),
    "unit" VARCHAR(255),
    "unitAbbreviation" VARCHAR(255),
    "defectKind" VARCHAR(255),
    "defectGroup" VARCHAR(255),
    "defectType" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nenDefects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objects" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255),
    "location" VARCHAR(255),
    "latitude" DECIMAL(11,8),
    "longitude" DECIMAL(11,8),
    "updatedOn" TIMESTAMPTZ(6) NOT NULL,
    "compositionIsVisible" BOOLEAN NOT NULL,
    "clientCompanyId" UUID,
    "operatorCompanyId" UUID,
    "surveyorCompanyId" UUID,
    "objectTypeId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "inspectionStandardId" UUID,
    "ownerCompanyId" UUID,
    "customerVersion" VARCHAR(255) DEFAULT E'all',
    "isPublic" BOOLEAN DEFAULT false,
    "isDemo" BOOLEAN DEFAULT false,
    "siteId" UUID,
    "constructionYear" INTEGER,
    "externalRefId" VARCHAR(255),
    "useage" VARCHAR(255),
    "managementOrganization" VARCHAR(255),
    "shape" geometry,
    "shapeSrid" INTEGER,
    "status" VARCHAR(255) DEFAULT E'inUse',
    "effortCategory" VARCHAR(255),
    "effortCalculation" INTEGER,
    "trafficType" VARCHAR(255),
    "mainMaterial" VARCHAR(255),
    "marineInfrastrutureType" VARCHAR(255),
    "length" DECIMAL(15,2),
    "width" DECIMAL(15,2),
    "squareMeters" DECIMAL(15,2),
    "attributes" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "objects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectTypeDefects" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255),
    "description" TEXT NOT NULL,
    "useSeriousness" BOOLEAN NOT NULL,
    "useIntensity" BOOLEAN NOT NULL,
    "useExtend" BOOLEAN NOT NULL,
    "objectTypeUnitId" UUID,
    "objectTypeElementId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "seriousness" VARCHAR(255),
    "intensity" VARCHAR(255),
    "unit" VARCHAR(255),
    "unitAbbreviation" VARCHAR(255),
    "defectType" VARCHAR(255),
    "material" VARCHAR(255),

    CONSTRAINT "objectTypeDefects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectTypeElementCodes" (
    "id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "replacementIndex" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "elementGroupName" VARCHAR(255),
    "isStructural" BOOLEAN NOT NULL DEFAULT false,
    "isElectrical" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "objectTypeElementCodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectTypeElements" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255),
    "isDefault" BOOLEAN NOT NULL,
    "inspectionStandardId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "categoryId" UUID,
    "isActive" BOOLEAN DEFAULT true,
    "isUtResultPlaceholder" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "objectTypeElements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectTypes" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "languageId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "customerVersion" VARCHAR(255) DEFAULT E'all',
    "isActive" BOOLEAN DEFAULT true,
    "dmsCategory" VARCHAR(255) NOT NULL DEFAULT E'Bruggen',

    CONSTRAINT "objectTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectTypeUnitCodes" (
    "id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "replacementIndex" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "isStructural" BOOLEAN NOT NULL DEFAULT false,
    "isElectrical" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "objectTypeUnitCodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectTypeUnits" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255),
    "isDefault" BOOLEAN NOT NULL,
    "objectTypeElementId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "isActive" BOOLEAN DEFAULT true,

    CONSTRAINT "objectTypeUnits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observationPoints" (
    "id" UUID NOT NULL,
    "3dModelX" VARCHAR(255),
    "3dModelY" VARCHAR(255),
    "3dModelZ" VARCHAR(255),
    "3dModelCameraX" VARCHAR(255),
    "3dModelCameraY" VARCHAR(255),
    "3dModelCameraZ" VARCHAR(255),
    "elementId" UUID,
    "unitId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "title" VARCHAR(255),
    "assetId" UUID,
    "surveyId" UUID NOT NULL,
    "manifestationId" UUID,
    "is2dSourcePoint" BOOLEAN DEFAULT false,
    "2dSourceAssetId" UUID,
    "2dGeometry" JSONB,
    "failureModeId" UUID,

    CONSTRAINT "observationPoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poleLabResults" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "code" VARCHAR(32) NOT NULL,
    "satisfies" BOOLEAN,
    "woodtype" VARCHAR(32),
    "polediameter" INTEGER,
    "lengthToHeartPole" INTEGER,
    "thicknessOfHeartwood" INTEGER,
    "thicknessOfSapwood" INTEGER,
    "erosionBacteria" BOOLEAN,
    "tunnelingBacteria" BOOLEAN,
    "moldThreads" BOOLEAN,
    "blueMold" BOOLEAN,
    "softrot" BOOLEAN,
    "brownRot" BOOLEAN,
    "whiteRot" BOOLEAN,
    "findings" TEXT,
    "lengthSubsample1" INTEGER,
    "lengthSubsample2" INTEGER,
    "lengthSubsample3" INTEGER,
    "lengthSubsample4" INTEGER,
    "lengthSubsample5" INTEGER,
    "lengthSubsample6" INTEGER,
    "lengthSubsample7" INTEGER,
    "lengthSubsample8" INTEGER,
    "degreeOfDamageToSubsample1" "degreeOfDamage",
    "degreeOfDamageToSubsample2" "degreeOfDamage",
    "degreeOfDamageToSubsample3" "degreeOfDamage",
    "degreeOfDamageToSubsample4" "degreeOfDamage",
    "degreeOfDamageToSubsample5" "degreeOfDamage",
    "degreeOfDamageToSubsample6" "degreeOfDamage",
    "degreeOfDamageToSubsample7" "degreeOfDamage",
    "degreeOfDamageToSubsample8" "degreeOfDamage",
    "volumeSubsample1" DECIMAL(5,2),
    "volumeSubsample2" DECIMAL(5,2),
    "volumeSubsample3" DECIMAL(5,2),
    "volumeSubsample4" DECIMAL(5,2),
    "volumeSubsample5" DECIMAL(5,2),
    "volumeSubsample6" DECIMAL(5,2),
    "volumeSubsample7" DECIMAL(5,2),
    "volumeSubsample8" DECIMAL(5,2),
    "wetWeightSubsample1" DECIMAL(5,2),
    "wetWeightSubsample2" DECIMAL(5,2),
    "wetWeightSubsample3" DECIMAL(5,2),
    "wetWeightSubsample4" DECIMAL(5,2),
    "wetWeightSubsample5" DECIMAL(5,2),
    "wetWeightSubsample6" DECIMAL(5,2),
    "wetWeightSubsample7" DECIMAL(5,2),
    "wetWeightSubsample8" DECIMAL(5,2),
    "dryWeightSubsample1" DECIMAL(5,2),
    "dryWeightSubsample2" DECIMAL(5,2),
    "dryWeightSubsample3" DECIMAL(5,2),
    "dryWeightSubsample4" DECIMAL(5,2),
    "dryWeightSubsample5" DECIMAL(5,2),
    "dryWeightSubsample6" DECIMAL(5,2),
    "dryWeightSubsample7" DECIMAL(5,2),
    "dryWeightSubsample8" DECIMAL(5,2),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "poleLabResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrations" (
    "emailAddress" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("emailAddress")
);

-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "sites" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ownerCompanyId" UUID,
    "image" VARCHAR(255),
    "imageMap" TEXT,
    "customerVersion" VARCHAR(255) DEFAULT E'all',
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveyElementGroups" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "initialRemarks" TEXT,
    "inspectionRemarks" TEXT,
    "craMaxInitialScore" INTEGER,
    "craMaxHistoryScore" INTEGER,
    "craMaxInspectionScore" INTEGER,
    "inspectionStandardData" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "surveyElementGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveyElements" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "elementId" UUID NOT NULL,
    "inspectionStandardData" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "surveyElements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveyManifestations" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "manifestationId" UUID NOT NULL,
    "inspectionStandardData" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "surveyManifestations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveyModifications" (
    "id" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "surveryedOn" TIMESTAMPTZ(6) NOT NULL,
    "surveyId" UUID NOT NULL,
    "objectId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "surveyModifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" UUID NOT NULL,
    "surveryedOn" TIMESTAMPTZ(6) NOT NULL,
    "updatedOn" TIMESTAMPTZ(6) NOT NULL,
    "status" TEXT,
    "description" TEXT,
    "3dUri" VARCHAR(255),
    "summaryAndAdvice" TEXT,
    "operatorCompanyId" UUID,
    "surveyorCompanyId" UUID,
    "objectId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "condition" VARCHAR(1),
    "storageUsed" BIGINT,
    "material" VARCHAR(255),
    "isDOMLight" BOOLEAN,
    "pointCloudStorageUsed" BIGINT NOT NULL DEFAULT 0,
    "isAssetDescriptionVisible" BOOLEAN,
    "isAnnotationsDefaultVisible" BOOLEAN DEFAULT true,
    "isVideoDownloadVisible" BOOLEAN DEFAULT true,
    "projectNumber" VARCHAR(255),
    "inspectionStandardType" VARCHAR(255),
    "3dUriGeo" VARCHAR(255),
    "3dUriMultiBeam" VARCHAR(255),
    "careCondition" VARCHAR(1),
    "scanLineCoordinates" JSONB,
    "shapesInModel" JSONB,
    "isFmecaAvailable" BOOLEAN NOT NULL DEFAULT false,
    "isCraAvailable" BOOLEAN NOT NULL DEFAULT false,
    "craInitialHistoryIsBuildBetween4074" BOOLEAN NOT NULL DEFAULT false,
    "craInitialHistoryIsStaticallyIndeterminate" BOOLEAN NOT NULL DEFAULT false,
    "craInitialHistoryBuildBetween4074Remarks" TEXT,
    "craInitialHistoryStaticallyIndeterminateRemarks" TEXT,
    "craInspectionIsBuildBetween4074" BOOLEAN NOT NULL DEFAULT false,
    "craInspectionIsStaticallyIndeterminate" BOOLEAN NOT NULL DEFAULT false,
    "craInspectionBuildBetween4074Remarks" TEXT,
    "craInspectionStaticallyIndeterminateRemarks" TEXT,
    "craInitialHistoryRemarks" TEXT,
    "craInspectionRemarks" TEXT,
    "craInitialHistoryScore" DECIMAL(15,6),
    "craInspectionScore" DECIMAL(15,6),
    "craInitialHistoryCondition" INTEGER NOT NULL DEFAULT 0,
    "craInspectionCondition" INTEGER NOT NULL DEFAULT 0,
    "craInitialHistoryConditionWithoutFactor" INTEGER NOT NULL DEFAULT 0,
    "craInspectionConditionWithoutFactor" INTEGER NOT NULL DEFAULT 0,
    "preparedAuthor" VARCHAR(255),
    "preparedDate" TIMESTAMPTZ(6),
    "verifiedAuthor" VARCHAR(255),
    "verifiedDate" TIMESTAMPTZ(6),
    "craInitialHistoryConditionScoreWithoutFactor" INTEGER,
    "craInspectionConditionScoreWithoutFactor" INTEGER,
    "craInitialHistoryConditionScore" INTEGER,
    "craInspectionConditionScore" INTEGER,
    "batchId" UUID,
    "inspectionStandardData" JSONB NOT NULL DEFAULT '{}',
    "craInitialHistoryIsBuildBetween4074IsRelevant" BOOLEAN NOT NULL DEFAULT false,
    "craInitialHistoryIsStaticallyIndeterminateIsRelevant" BOOLEAN NOT NULL DEFAULT false,
    "craInspectionIsBuildBetween4074IsRelevant" BOOLEAN NOT NULL DEFAULT false,
    "craInspectionIsStaticallyIndeterminateIsRelevant" BOOLEAN NOT NULL DEFAULT false,
    "legacyFailureMode" BOOLEAN,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveyUnits" (
    "id" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "unitId" UUID NOT NULL,
    "inspectionStandardData" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "surveyUnits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tranches" (
    "id" UUID NOT NULL,
    "contractId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) DEFAULT E'open',
    "plannedStartDate" TIMESTAMPTZ(6),
    "plannedEndDate" TIMESTAMPTZ(6),
    "startDate" TIMESTAMPTZ(6),
    "endDate" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "tranches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unitRemarks" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "remarkedOn" TIMESTAMPTZ(6) NOT NULL,
    "unitId" UUID NOT NULL,
    "surveyId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "remarkedBy" VARCHAR(255) NOT NULL,

    CONSTRAINT "unitRemarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255),
    "location" VARCHAR(255),
    "elementId" UUID NOT NULL,
    "conditionId" UUID,
    "observationPointId" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "material" VARCHAR(255),
    "quantity" INTEGER,
    "quantityUnitOfMeasurement" VARCHAR(255),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "constructionYear" INTEGER,
    "objectId" UUID NOT NULL,
    "isStructural" BOOLEAN NOT NULL DEFAULT false,
    "isElectrical" BOOLEAN NOT NULL DEFAULT false,
    "isStructuralObjectSpecific" BOOLEAN NOT NULL DEFAULT false,
    "isElectricalObjectSpecific" BOOLEAN NOT NULL DEFAULT false,
    "isRelevant" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userContracts" (
    "userId" UUID NOT NULL,
    "contractId" UUID NOT NULL,

    CONSTRAINT "userContracts_pkey" PRIMARY KEY ("userId","contractId")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255) NOT NULL,
    "emailAddress" VARCHAR(255) NOT NULL,
    "mobileNumber" VARCHAR(255),
    "officeNumber" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(255) NOT NULL,
    "lastLoginOn" TIMESTAMPTZ(6),
    "status" TEXT,
    "language" VARCHAR(255) NOT NULL,
    "companyId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "loginAttempts" INTEGER DEFAULT 0,
    "isReadOnly" BOOLEAN DEFAULT false,
    "isAccountManager" BOOLEAN DEFAULT true,
    "isConfigurationManager" BOOLEAN DEFAULT false,
    "isWebGL1User" BOOLEAN DEFAULT false,
    "passwordChangeDate" DATE,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "usePointCloud" BOOLEAN NOT NULL DEFAULT true,
    "isContractManager" BOOLEAN DEFAULT false,
    "source" TEXT NOT NULL DEFAULT E'local',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utProjects" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "clientName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "maxScanLines" INTEGER,
    "maxScanLinePositions" INTEGER,
    "startedOnDate" DATE,
    "endedOnDate" DATE,
    "updatedOnDateTime" TIMESTAMPTZ(6) NOT NULL,
    "createdOnDateTime" TIMESTAMPTZ(6) NOT NULL,
    "useScanLines" BOOLEAN NOT NULL DEFAULT false,
    "isSavedInTheCloud" BOOLEAN NOT NULL DEFAULT false,
    "maxPositionMeasurements" INTEGER NOT NULL DEFAULT 1,
    "clientCompanyId" UUID NOT NULL,
    "elementId" UUID,
    "unitId" UUID,
    "manifestationId" UUID,
    "objectId" UUID,
    "surveyId" UUID,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assetremarks_id_unique" ON "assetRemarks"("id");

-- CreateIndex
CREATE INDEX "assetRemarks_assetId_idx" ON "assetRemarks"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "assets_id_unique" ON "assets"("id");

-- CreateIndex
CREATE INDEX "assets_defectId_idx" ON "assets"("defectId");

-- CreateIndex
CREATE INDEX "assets_derivedFromAssetId_idx" ON "assets"("derivedFromAssetId");

-- CreateIndex
CREATE INDEX "assets_elementId_idx" ON "assets"("elementId");

-- CreateIndex
CREATE INDEX "assets_failureModeId_idx" ON "assets"("failureModeId");

-- CreateIndex
CREATE INDEX "assets_imageMeasurementId_idx" ON "assets"("imageMeasurementId");

-- CreateIndex
CREATE INDEX "assets_manifestationId_idx" ON "assets"("manifestationId");

-- CreateIndex
CREATE INDEX "assets_objectId_idx" ON "assets"("objectId");

-- CreateIndex
CREATE INDEX "assets_surveyId_idx" ON "assets"("surveyId");

-- CreateIndex
CREATE INDEX "assets_unitId_idx" ON "assets"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "auditevents_id_unique" ON "auditEvents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "batchdocuments_id_unique" ON "batchDocuments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "batches_id_unique" ON "batches"("id");

-- CreateIndex
CREATE INDEX "batches_clientCompanyId_idx" ON "batches"("clientCompanyId");

-- CreateIndex
CREATE INDEX "batches_name_idx" ON "batches"("name");

-- CreateIndex
CREATE INDEX "batches_updated_at_idx" ON "batches"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "batchexecutorcompanies_id_unique" ON "batchExecutorCompanies"("id");

-- CreateIndex
CREATE INDEX "batchExecutorCompanies_batchId_idx" ON "batchExecutorCompanies"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "batchexecutorcompanies_companyid_batchid_unique" ON "batchExecutorCompanies"("companyId", "batchId");

-- CreateIndex
CREATE UNIQUE INDEX "batchobjects_id_unique" ON "batchObjects"("id");

-- CreateIndex
CREATE INDEX "batchObjects_batchId_idx" ON "batchObjects"("batchId");

-- CreateIndex
CREATE INDEX "batchObjects_objectId_idx" ON "batchObjects"("objectId");

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_unique" ON "companies"("id");

-- CreateIndex
CREATE INDEX "companies_name_idx" ON "companies"("name");

-- CreateIndex
CREATE INDEX "companyRelations_managedById_idx" ON "companyRelations"("managedById");

-- CreateIndex
CREATE INDEX "companyRelations_managesId_idx" ON "companyRelations"("managesId");

-- CreateIndex
CREATE UNIQUE INDEX "companyusages_id_unique" ON "companyUsages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companyusages_companyid_createdon_unique" ON "companyUsages"("companyId", "createdOn");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_id_unique" ON "conditions"("id");

-- CreateIndex
CREATE INDEX "conditions_elementId_idx" ON "conditions"("elementId");

-- CreateIndex
CREATE INDEX "conditions_manifestationId_idx" ON "conditions"("manifestationId");

-- CreateIndex
CREATE INDEX "conditions_unitId_idx" ON "conditions"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_surveyid_elementid_unique" ON "conditions"("surveyId", "elementId");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_surveyid_manifestationid_unique" ON "conditions"("surveyId", "manifestationId");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_surveyid_unitid_unique" ON "conditions"("surveyId", "unitId");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_unique_element" ON "conditions"("surveyId", "elementId");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_unique_manifestation" ON "conditions"("surveyId", "manifestationId");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_unique_unit" ON "conditions"("surveyId", "unitId");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_id_unique" ON "contracts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "datasets_id_unique" ON "dataSets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "defaultfailuremodes_id_unique" ON "defaultFailureModes"("id");

-- CreateIndex
CREATE INDEX "defaultFailureModes_objectTypeUnitCodeId_idx" ON "defaultFailureModes"("objectTypeUnitCodeId");

-- CreateIndex
CREATE UNIQUE INDEX "defaultmaintenancemeasures_id_unique" ON "defaultMaintenanceMeasures"("id");

-- CreateIndex
CREATE INDEX "defaultMaintenanceMeasures_objectTypeUnitCodeId_idx" ON "defaultMaintenanceMeasures"("objectTypeUnitCodeId");

-- CreateIndex
CREATE UNIQUE INDEX "defects_id_unique" ON "defects"("id");

-- CreateIndex
CREATE INDEX "defects_conditionId_idx" ON "defects"("conditionId");

-- CreateIndex
CREATE UNIQUE INDEX "derivedconditionscores_id_unique" ON "derivedConditionScores"("id");

-- CreateIndex
CREATE INDEX "derivedConditionScores_elementId_idx" ON "derivedConditionScores"("elementId");

-- CreateIndex
CREATE INDEX "derivedConditionScores_manifestationId_idx" ON "derivedConditionScores"("manifestationId");

-- CreateIndex
CREATE INDEX "derivedConditionScores_surveyId_idx" ON "derivedConditionScores"("surveyId");

-- CreateIndex
CREATE INDEX "derivedConditionScores_unitId_idx" ON "derivedConditionScores"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "elementcategories_id_unique" ON "elementCategories"("id");

-- CreateIndex
CREATE INDEX "elementCategories_inspectionStandardId_idx" ON "elementCategories"("inspectionStandardId");

-- CreateIndex
CREATE INDEX "elementCategories_languageId_idx" ON "elementCategories"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "elementremarks_id_unique" ON "elementRemarks"("id");

-- CreateIndex
CREATE INDEX "elementRemarks_elementId_idx" ON "elementRemarks"("elementId");

-- CreateIndex
CREATE INDEX "elementRemarks_surveyId_idx" ON "elementRemarks"("surveyId");

-- CreateIndex
CREATE UNIQUE INDEX "elements_id_unique" ON "elements"("id");

-- CreateIndex
CREATE INDEX "elements_categoryId_idx" ON "elements"("categoryId");

-- CreateIndex
CREATE INDEX "elements_code_idx" ON "elements"("code");

-- CreateIndex
CREATE INDEX "elements_conditionId_idx" ON "elements"("conditionId");

-- CreateIndex
CREATE INDEX "elements_name_idx" ON "elements"("name");

-- CreateIndex
CREATE INDEX "elements_objectId_idx" ON "elements"("objectId");

-- CreateIndex
CREATE INDEX "elements_observationPointId_idx" ON "elements"("observationPointId");

-- CreateIndex
CREATE UNIQUE INDEX "failuremodes_id_unique" ON "failureModes"("id");

-- CreateIndex
CREATE INDEX "failureModes_defaultFailureModeId_idx" ON "failureModes"("defaultFailureModeId");

-- CreateIndex
CREATE INDEX "failureModes_elementId_idx" ON "failureModes"("elementId");

-- CreateIndex
CREATE INDEX "failureModes_manifestationId_idx" ON "failureModes"("manifestationId");

-- CreateIndex
CREATE INDEX "failureModes_surveyId_idx" ON "failureModes"("surveyId");

-- CreateIndex
CREATE INDEX "failureModes_unitId_idx" ON "failureModes"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "failuremodes_surveyid_surveyscopeid_unique" ON "failureModes"("surveyId", "surveyScopeId");

-- CreateIndex
CREATE UNIQUE INDEX "findings_id_unique" ON "findings"("id");

-- CreateIndex
CREATE INDEX "findings_failureModeId_idx" ON "findings"("failureModeId");

-- CreateIndex
CREATE UNIQUE INDEX "findings_surveyid_surveyscopeid_unique" ON "findings"("surveyId", "surveyScopeId");

-- CreateIndex
CREATE UNIQUE INDEX "finishedjobs_id_unique" ON "finishedJobs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "flights_id_unique" ON "flights"("id");

-- CreateIndex
CREATE INDEX "flights_projectId_idx" ON "flights"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "fmecafurtherinvestigations_id_unique" ON "fmecaFurtherInvestigations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "fmecafurtherinvestigations_surveyid_surveyscopeid_unique" ON "fmecaFurtherInvestigations"("surveyId", "surveyScopeId");

-- CreateIndex
CREATE UNIQUE INDEX "imagemeasurements_id_unique" ON "imageMeasurements"("id");

-- CreateIndex
CREATE INDEX "imageMeasurements_assetId_idx" ON "imageMeasurements"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "inspectionfindings_id_unique" ON "inspectionFindings"("id");

-- CreateIndex
CREATE INDEX "inspectionFindings_surveyId_idx" ON "inspectionFindings"("surveyId");

-- CreateIndex
CREATE INDEX "inspectionFindings_unitId_idx" ON "inspectionFindings"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "inspectionplans_id_unique" ON "inspectionPlans"("id");

-- CreateIndex
CREATE INDEX "inspectionPlans_manifestationId_idx" ON "inspectionPlans"("manifestationId");

-- CreateIndex
CREATE INDEX "inspectionPlans_surveyId_idx" ON "inspectionPlans"("surveyId");

-- CreateIndex
CREATE INDEX "inspectionPlans_unitId_idx" ON "inspectionPlans"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "inspectionplans_surveyid_surveyscopeid_unique" ON "inspectionPlans"("surveyId", "surveyScopeId");

-- CreateIndex
CREATE UNIQUE INDEX "inspectionstandards_id_unique" ON "inspectionStandards"("id");

-- CreateIndex
CREATE INDEX "inspectionStandards_languageId_idx" ON "inspectionStandards"("languageId");

-- CreateIndex
CREATE INDEX "inspectionStandards_objectTypeId_idx" ON "inspectionStandards"("objectTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_id_unique" ON "jobs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "languages_id_unique" ON "languages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_unique" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "licences_id_unique" ON "licences"("id");

-- CreateIndex
CREATE INDEX "licences_companyId_idx" ON "licences"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "maintenancemeasures_id_unique" ON "maintenanceMeasures"("id");

-- CreateIndex
CREATE INDEX "maintenanceMeasures_defaultMaintenanceMeasureId_idx" ON "maintenanceMeasures"("defaultMaintenanceMeasureId");

-- CreateIndex
CREATE INDEX "maintenanceMeasures_defectId_idx" ON "maintenanceMeasures"("defectId");

-- CreateIndex
CREATE INDEX "maintenanceMeasures_failureModeId_idx" ON "maintenanceMeasures"("failureModeId");

-- CreateIndex
CREATE INDEX "maintenanceMeasures_manifestationId_idx" ON "maintenanceMeasures"("manifestationId");

-- CreateIndex
CREATE INDEX "maintenanceMeasures_objectId_idx" ON "maintenanceMeasures"("objectId");

-- CreateIndex
CREATE INDEX "maintenanceMeasures_previousMaintenanceMeasureId_idx" ON "maintenanceMeasures"("previousMaintenanceMeasureId");

-- CreateIndex
CREATE INDEX "maintenanceMeasures_surveyId_idx" ON "maintenanceMeasures"("surveyId");

-- CreateIndex
CREATE INDEX "maintenanceMeasures_unitId_idx" ON "maintenanceMeasures"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "maintenancemeasures_surveyid_surveyscopeid_unique" ON "maintenanceMeasures"("surveyId", "surveyScopeId");

-- CreateIndex
CREATE UNIQUE INDEX "manifestationremarks_id_unique" ON "manifestationRemarks"("id");

-- CreateIndex
CREATE INDEX "manifestationRemarks_manifestationId_idx" ON "manifestationRemarks"("manifestationId");

-- CreateIndex
CREATE INDEX "manifestationRemarks_surveyId_idx" ON "manifestationRemarks"("surveyId");

-- CreateIndex
CREATE UNIQUE INDEX "manifestations_id_unique" ON "manifestations"("id");

-- CreateIndex
CREATE INDEX "manifestations_conditionId_idx" ON "manifestations"("conditionId");

-- CreateIndex
CREATE INDEX "manifestations_elementId_idx" ON "manifestations"("elementId");

-- CreateIndex
CREATE INDEX "manifestations_observationPointId_idx" ON "manifestations"("observationPointId");

-- CreateIndex
CREATE INDEX "manifestations_unitId_idx" ON "manifestations"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "measurementcandidates_id_unique" ON "measurementCandidates"("id");

-- CreateIndex
CREATE INDEX "measurementCandidates_flightId_idx" ON "measurementCandidates"("flightId");

-- CreateIndex
CREATE INDEX "measurementCandidates_measurementId_idx" ON "measurementCandidates"("measurementId");

-- CreateIndex
CREATE UNIQUE INDEX "measurements_id_unique" ON "measurements"("id");

-- CreateIndex
CREATE INDEX "measurements_flightId_idx" ON "measurements"("flightId");

-- CreateIndex
CREATE UNIQUE INDEX "mutationqueue_id_unique" ON "mutationQueue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mutationqueue_objectid_unique" ON "mutationQueue"("objectId");

-- CreateIndex
CREATE UNIQUE INDEX "nendefects_id_unique" ON "nenDefects"("id");

-- CreateIndex
CREATE UNIQUE INDEX "nendefects_code_unique" ON "nenDefects"("code");

-- CreateIndex
CREATE INDEX "nenDefects_code_idx" ON "nenDefects"("code");

-- CreateIndex
CREATE UNIQUE INDEX "objects_id_unique" ON "objects"("id");

-- CreateIndex
CREATE INDEX "objects_clientCompanyId_idx" ON "objects"("clientCompanyId");

-- CreateIndex
CREATE INDEX "objects_code_idx" ON "objects"("code");

-- CreateIndex
CREATE INDEX "objects_inspectionStandardId_idx" ON "objects"("inspectionStandardId");

-- CreateIndex
CREATE INDEX "objects_name_idx" ON "objects"("name");

-- CreateIndex
CREATE INDEX "objects_objectTypeId_idx" ON "objects"("objectTypeId");

-- CreateIndex
CREATE INDEX "objects_operatorCompanyId_idx" ON "objects"("operatorCompanyId");

-- CreateIndex
CREATE INDEX "objects_ownerCompanyId_idx" ON "objects"("ownerCompanyId");

-- CreateIndex
CREATE INDEX "objects_siteId_idx" ON "objects"("siteId");

-- CreateIndex
CREATE INDEX "objects_surveyorCompanyId_idx" ON "objects"("surveyorCompanyId");

-- CreateIndex
CREATE INDEX "objects_updatedOn_idx" ON "objects"("updatedOn");

-- CreateIndex
CREATE UNIQUE INDEX "objecttypedefects_id_unique" ON "objectTypeDefects"("id");

-- CreateIndex
CREATE INDEX "objectTypeDefects_objectTypeElementId_idx" ON "objectTypeDefects"("objectTypeElementId");

-- CreateIndex
CREATE INDEX "objectTypeDefects_objectTypeUnitId_idx" ON "objectTypeDefects"("objectTypeUnitId");

-- CreateIndex
CREATE UNIQUE INDEX "objecttypeelementcodes_id_unique" ON "objectTypeElementCodes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "objecttypeelementcodes_code_unique" ON "objectTypeElementCodes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "objecttypeelements_id_unique" ON "objectTypeElements"("id");

-- CreateIndex
CREATE INDEX "objectTypeElements_categoryId_idx" ON "objectTypeElements"("categoryId");

-- CreateIndex
CREATE INDEX "objectTypeElements_code_idx" ON "objectTypeElements"("code");

-- CreateIndex
CREATE INDEX "objectTypeElements_inspectionStandardId_idx" ON "objectTypeElements"("inspectionStandardId");

-- CreateIndex
CREATE INDEX "objectTypeElements_name_idx" ON "objectTypeElements"("name");

-- CreateIndex
CREATE UNIQUE INDEX "objecttypes_id_unique" ON "objectTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "objecttypes_name_unique" ON "objectTypes"("name");

-- CreateIndex
CREATE INDEX "objectTypes_languageId_idx" ON "objectTypes"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "objecttypeunitcodes_id_unique" ON "objectTypeUnitCodes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "objecttypeunitcodes_code_unique" ON "objectTypeUnitCodes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "objecttypeunits_id_unique" ON "objectTypeUnits"("id");

-- CreateIndex
CREATE INDEX "objectTypeUnits_code_idx" ON "objectTypeUnits"("code");

-- CreateIndex
CREATE INDEX "objectTypeUnits_name_idx" ON "objectTypeUnits"("name");

-- CreateIndex
CREATE INDEX "objectTypeUnits_objectTypeElementId_idx" ON "objectTypeUnits"("objectTypeElementId");

-- CreateIndex
CREATE UNIQUE INDEX "observationpoints_id_unique" ON "observationPoints"("id");

-- CreateIndex
CREATE INDEX "observationPoints_2dSourceAssetId_idx" ON "observationPoints"("2dSourceAssetId");

-- CreateIndex
CREATE INDEX "observationPoints_assetId_idx" ON "observationPoints"("assetId");

-- CreateIndex
CREATE INDEX "observationPoints_elementId_idx" ON "observationPoints"("elementId");

-- CreateIndex
CREATE INDEX "observationPoints_failureModeId_idx" ON "observationPoints"("failureModeId");

-- CreateIndex
CREATE INDEX "observationPoints_manifestationId_idx" ON "observationPoints"("manifestationId");

-- CreateIndex
CREATE INDEX "observationPoints_surveyId_idx" ON "observationPoints"("surveyId");

-- CreateIndex
CREATE INDEX "observationPoints_unitId_idx" ON "observationPoints"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "polelabresults_id_unique" ON "poleLabResults"("id");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_emailaddress_unique" ON "registrations"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "sites_id_unique" ON "sites"("id");

-- CreateIndex
CREATE INDEX "sites_ownerCompanyId_idx" ON "sites"("ownerCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "surveyelementgroups_id_unique" ON "surveyElementGroups"("id");

-- CreateIndex
CREATE UNIQUE INDEX "surveyelementgroups _surveyid_name_unique" ON "surveyElementGroups"("surveyId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "surveyelements_id_unique" ON "surveyElements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "surveymanifestations_id_unique" ON "surveyManifestations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "surveymodifications_id_unique" ON "surveyModifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "surveys_id_unique" ON "surveys"("id");

-- CreateIndex
CREATE INDEX "surveys_batchId_idx" ON "surveys"("batchId");

-- CreateIndex
CREATE INDEX "surveys_objectId_idx" ON "surveys"("objectId");

-- CreateIndex
CREATE INDEX "surveys_operatorCompanyId_idx" ON "surveys"("operatorCompanyId");

-- CreateIndex
CREATE INDEX "surveys_surveryedOn_idx" ON "surveys"("surveryedOn");

-- CreateIndex
CREATE INDEX "surveys_surveyorCompanyId_idx" ON "surveys"("surveyorCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "surveyunits_id_unique" ON "surveyUnits"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tranches_id_unique" ON "tranches"("id");

-- CreateIndex
CREATE UNIQUE INDEX "unitremarks_id_unique" ON "unitRemarks"("id");

-- CreateIndex
CREATE INDEX "unitRemarks_surveyId_idx" ON "unitRemarks"("surveyId");

-- CreateIndex
CREATE INDEX "unitRemarks_unitId_idx" ON "unitRemarks"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "units_id_unique" ON "units"("id");

-- CreateIndex
CREATE INDEX "units_code_idx" ON "units"("code");

-- CreateIndex
CREATE INDEX "units_conditionId_idx" ON "units"("conditionId");

-- CreateIndex
CREATE INDEX "units_elementId_idx" ON "units"("elementId");

-- CreateIndex
CREATE INDEX "units_name_idx" ON "units"("name");

-- CreateIndex
CREATE INDEX "units_observationPointId_idx" ON "units"("observationPointId");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_unique" ON "users"("id");

-- CreateIndex
CREATE INDEX "users_companyId_idx" ON "users"("companyId");

-- CreateIndex
CREATE INDEX "users_emailAddress_idx" ON "users"("emailAddress");

-- CreateIndex
CREATE INDEX "users_updated_at_idx" ON "users"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "projects_id_unique" ON "utProjects"("id");

-- CreateIndex
CREATE INDEX "utProjects_clientCompanyId_idx" ON "utProjects"("clientCompanyId");

-- CreateIndex
CREATE INDEX "utProjects_elementId_idx" ON "utProjects"("elementId");

-- CreateIndex
CREATE INDEX "utProjects_manifestationId_idx" ON "utProjects"("manifestationId");

-- CreateIndex
CREATE INDEX "utProjects_objectId_idx" ON "utProjects"("objectId");

-- CreateIndex
CREATE INDEX "utProjects_surveyId_idx" ON "utProjects"("surveyId");

-- CreateIndex
CREATE INDEX "utProjects_unitId_idx" ON "utProjects"("unitId");

-- AddForeignKey
ALTER TABLE "assetRemarks" ADD CONSTRAINT "assetremarks_assetid_foreign" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_derivedfromassetid_foreign" FOREIGN KEY ("derivedFromAssetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_defectid_foreign" FOREIGN KEY ("defectId") REFERENCES "defects"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_failuremodeid_foreign" FOREIGN KEY ("failureModeId") REFERENCES "failureModes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_imagemeasurementid_foreign" FOREIGN KEY ("imageMeasurementId") REFERENCES "imageMeasurements"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_uid_foreign" FOREIGN KEY ("uid") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auditEvents" ADD CONSTRAINT "auditevents_companyid_foreign" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auditEvents" ADD CONSTRAINT "auditevents_objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auditEvents" ADD CONSTRAINT "auditevents_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_clientcompanyid_foreign" FOREIGN KEY ("clientCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_contractid_foreign" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_tranchid_foreign" FOREIGN KEY ("tranchId") REFERENCES "tranches"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batchExecutorCompanies" ADD CONSTRAINT "batchexecutorcompanies_batchid_foreign" FOREIGN KEY ("batchId") REFERENCES "batches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batchExecutorCompanies" ADD CONSTRAINT "batchexecutorcompanies_companyid_foreign" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batchObjects" ADD CONSTRAINT "batchobjects_batchid_foreign" FOREIGN KEY ("batchId") REFERENCES "batches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batchObjects" ADD CONSTRAINT "batchobjects_objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "companyRelations" ADD CONSTRAINT "companyrelations_managedbyid_foreign" FOREIGN KEY ("managedById") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "companyRelations" ADD CONSTRAINT "companyrelations_managesid_foreign" FOREIGN KEY ("managesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "companyUsages" ADD CONSTRAINT "companyusages_companyid_foreign" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conditions" ADD CONSTRAINT "conditions_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conditions" ADD CONSTRAINT "conditions_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conditions" ADD CONSTRAINT "conditions_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conditions" ADD CONSTRAINT "conditions_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "defaultFailureModes" ADD CONSTRAINT "defaultfailuremodes_objecttypeunitcodeid_foreign" FOREIGN KEY ("objectTypeUnitCodeId") REFERENCES "objectTypeUnitCodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "defaultMaintenanceMeasures" ADD CONSTRAINT "defaultmaintenancemeasures_objecttypeunitcodeid_foreign" FOREIGN KEY ("objectTypeUnitCodeId") REFERENCES "objectTypeUnitCodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "defects" ADD CONSTRAINT "defects_conditionid_foreign" FOREIGN KEY ("conditionId") REFERENCES "conditions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "derivedConditionScores" ADD CONSTRAINT "derivedconditionscores_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "derivedConditionScores" ADD CONSTRAINT "derivedconditionscores_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "derivedConditionScores" ADD CONSTRAINT "derivedconditionscores_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "derivedConditionScores" ADD CONSTRAINT "derivedconditionscores_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "elementCategories" ADD CONSTRAINT "elementcategories_inspectionstandardid_foreign" FOREIGN KEY ("inspectionStandardId") REFERENCES "inspectionStandards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "elementCategories" ADD CONSTRAINT "elementcategories_languageid_foreign" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "elementRemarks" ADD CONSTRAINT "elementremarks_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "elementRemarks" ADD CONSTRAINT "elementremarks_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "elements" ADD CONSTRAINT "elements_conditionid_foreign" FOREIGN KEY ("conditionId") REFERENCES "conditions"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "elements" ADD CONSTRAINT "elements_categoryid_foreign" FOREIGN KEY ("categoryId") REFERENCES "elementCategories"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "elements" ADD CONSTRAINT "elements_objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "elements" ADD CONSTRAINT "elements_observationpointid_foreign" FOREIGN KEY ("observationPointId") REFERENCES "observationPoints"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_causeoffailure_foreign" FOREIGN KEY ("causeOfFailure") REFERENCES "dataSets"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_failuremode_foreign" FOREIGN KEY ("failureMode") REFERENCES "dataSets"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_function_foreign" FOREIGN KEY ("function") REFERENCES "dataSets"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_guideword_foreign" FOREIGN KEY ("guideword") REFERENCES "dataSets"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_sourceoffailure_foreign" FOREIGN KEY ("sourceOfFailure") REFERENCES "dataSets"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_defaultfailuremodeid_foreign" FOREIGN KEY ("defaultFailureModeId") REFERENCES "defaultFailureModes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes _copyoffailuremodeid_foreign" FOREIGN KEY ("copyOfFailureModeId") REFERENCES "failureModes"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "failureModes" ADD CONSTRAINT "failuremodes_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "findings" ADD CONSTRAINT "findings_failuremodeid_foreign" FOREIGN KEY ("failureModeId") REFERENCES "failureModes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "findings" ADD CONSTRAINT "findings_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_projectid_foreign" FOREIGN KEY ("projectId") REFERENCES "utProjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fmecaFurtherInvestigations" ADD CONSTRAINT "fmecafurtherinvestigations_failuremodeid_foreign" FOREIGN KEY ("failureModeId") REFERENCES "failureModes"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fmecaFurtherInvestigations" ADD CONSTRAINT "fmecafurtherinvestigations_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fmecaFurtherInvestigations" ADD CONSTRAINT "fmecafurtherinvestigations_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fmecaFurtherInvestigations" ADD CONSTRAINT "fmecafurtherinvestigations_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "imageMeasurements" ADD CONSTRAINT "imagemeasurements_assetid_foreign" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspectionFindings" ADD CONSTRAINT "inspectionfindings_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspectionFindings" ADD CONSTRAINT "inspectionfindings_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspectionPlans" ADD CONSTRAINT "inspectionplans_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspectionPlans" ADD CONSTRAINT "inspectionplans_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspectionPlans" ADD CONSTRAINT "inspectionplans_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspectionStandards" ADD CONSTRAINT "inspectionstandards_languageid_foreign" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspectionStandards" ADD CONSTRAINT "inspectionstandards_objecttypeid_foreign" FOREIGN KEY ("objectTypeId") REFERENCES "objectTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "licences" ADD CONSTRAINT "licences_companyid_foreign" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenanceMeasures" ADD CONSTRAINT "maintenancemeasures_defaultmaintenancemeasureid_foreign" FOREIGN KEY ("defaultMaintenanceMeasureId") REFERENCES "defaultMaintenanceMeasures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenanceMeasures" ADD CONSTRAINT "maintenancemeasures_defectid_foreign" FOREIGN KEY ("defectId") REFERENCES "defects"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenanceMeasures" ADD CONSTRAINT "maintenancemeasures_failuremodeid_foreign" FOREIGN KEY ("failureModeId") REFERENCES "failureModes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenanceMeasures" ADD CONSTRAINT "maintenancemeasures _previousmaintenancemeasureid_foreign" FOREIGN KEY ("previousMaintenanceMeasureId") REFERENCES "maintenanceMeasures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenanceMeasures" ADD CONSTRAINT "maintenancemeasures_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenanceMeasures" ADD CONSTRAINT "maintenancemeasures _objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenanceMeasures" ADD CONSTRAINT "maintenancemeasures_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenanceMeasures" ADD CONSTRAINT "maintenancemeasures_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "manifestationRemarks" ADD CONSTRAINT "manifestationremarks_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "manifestationRemarks" ADD CONSTRAINT "manifestationremarks_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "manifestations" ADD CONSTRAINT "manifestations_conditionid_foreign" FOREIGN KEY ("conditionId") REFERENCES "conditions"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "manifestations" ADD CONSTRAINT "manifestations_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "manifestations" ADD CONSTRAINT "manifestations _objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "manifestations" ADD CONSTRAINT "manifestations_observationpointid_foreign" FOREIGN KEY ("observationPointId") REFERENCES "observationPoints"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "manifestations" ADD CONSTRAINT "manifestations_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "measurementCandidates" ADD CONSTRAINT "measurementcandidates_flightid_foreign" FOREIGN KEY ("flightId") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "measurementCandidates" ADD CONSTRAINT "measurementcandidates_measurementid_foreign" FOREIGN KEY ("measurementId") REFERENCES "measurements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_flightid_foreign" FOREIGN KEY ("flightId") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mutationQueue" ADD CONSTRAINT "mutationqueue_objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_clientcompanyid_foreign" FOREIGN KEY ("clientCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_operatorcompanyid_foreign" FOREIGN KEY ("operatorCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_ownercompanyid_foreign" FOREIGN KEY ("ownerCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_surveyorcompanyid_foreign" FOREIGN KEY ("surveyorCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_inspectionstandardid_foreign" FOREIGN KEY ("inspectionStandardId") REFERENCES "inspectionStandards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_objecttypeid_foreign" FOREIGN KEY ("objectTypeId") REFERENCES "objectTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_siteid_foreign" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objectTypeDefects" ADD CONSTRAINT "objecttypedefects_objecttypeelementid_foreign" FOREIGN KEY ("objectTypeElementId") REFERENCES "objectTypeElements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objectTypeDefects" ADD CONSTRAINT "objecttypedefects_objecttypeunitid_foreign" FOREIGN KEY ("objectTypeUnitId") REFERENCES "objectTypeUnits"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objectTypeElements" ADD CONSTRAINT "objecttypeelements_categoryid_foreign" FOREIGN KEY ("categoryId") REFERENCES "elementCategories"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objectTypeElements" ADD CONSTRAINT "objecttypeelements_inspectionstandardid_foreign" FOREIGN KEY ("inspectionStandardId") REFERENCES "inspectionStandards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objectTypes" ADD CONSTRAINT "objecttypes_languageid_foreign" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objectTypeUnits" ADD CONSTRAINT "objecttypeunits_objecttypeelementid_foreign" FOREIGN KEY ("objectTypeElementId") REFERENCES "objectTypeElements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observationPoints" ADD CONSTRAINT "observationpoints_2dsourceassetid_foreign" FOREIGN KEY ("2dSourceAssetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observationPoints" ADD CONSTRAINT "observationpoints_assetid_foreign" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observationPoints" ADD CONSTRAINT "observationpoints_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observationPoints" ADD CONSTRAINT "observationpoints_failuremodeid_foreign" FOREIGN KEY ("failureModeId") REFERENCES "failureModes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observationPoints" ADD CONSTRAINT "observationpoints_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observationPoints" ADD CONSTRAINT "observationpoints_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observationPoints" ADD CONSTRAINT "observationpoints_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poleLabResults" ADD CONSTRAINT "polelabresults_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_ownercompanyid_foreign" FOREIGN KEY ("ownerCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveyElementGroups" ADD CONSTRAINT "surveyelementgroups_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveyElements" ADD CONSTRAINT "surveyelements_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveyElements" ADD CONSTRAINT "surveyelements_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveyManifestations" ADD CONSTRAINT "surveymanifestations_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveyManifestations" ADD CONSTRAINT "surveymanifestations_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveyModifications" ADD CONSTRAINT "surveymodifications_objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveyModifications" ADD CONSTRAINT "surveymodifications_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_batchid_foreign" FOREIGN KEY ("batchId") REFERENCES "batches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_operatorcompanyid_foreign" FOREIGN KEY ("operatorCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_surveyorcompanyid_foreign" FOREIGN KEY ("surveyorCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveyUnits" ADD CONSTRAINT "surveyunits_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveyUnits" ADD CONSTRAINT "surveyunits_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tranches" ADD CONSTRAINT "tranches_contractid_foreign" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unitRemarks" ADD CONSTRAINT "unitremarks_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unitRemarks" ADD CONSTRAINT "unitremarks_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_conditionid_foreign" FOREIGN KEY ("conditionId") REFERENCES "conditions"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units _objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_observationpointid_foreign" FOREIGN KEY ("observationPointId") REFERENCES "observationPoints"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyid_foreign" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utProjects" ADD CONSTRAINT "projects_companyid_foreign" FOREIGN KEY ("clientCompanyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utProjects" ADD CONSTRAINT "projects_elementid_foreign" FOREIGN KEY ("elementId") REFERENCES "elements"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utProjects" ADD CONSTRAINT "projects_manifestationid_foreign" FOREIGN KEY ("manifestationId") REFERENCES "manifestations"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utProjects" ADD CONSTRAINT "projects_objectid_foreign" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utProjects" ADD CONSTRAINT "projects_surveyid_foreign" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utProjects" ADD CONSTRAINT "projects_unitid_foreign" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
