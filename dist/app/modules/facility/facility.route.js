"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const facility_controller_1 = require("./facility.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const facility_validation_1 = require("./facility.validation");
const router = express_1.default.Router();
// Creating Facility
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.validateRequest)(facility_validation_1.FacilityValidation.createFacilityValidationSchema), facility_controller_1.FacilityController.createFacility);
// updating Facility
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.validateRequest)(facility_validation_1.FacilityValidation.updateFacilityValidationSchema), facility_controller_1.FacilityController.updateFacility);
// soft deleting facility
router.delete('/:id', (0, auth_1.default)('admin'), facility_controller_1.FacilityController.deleteFacility);
// get all facility
router.get('/', facility_controller_1.FacilityController.getAllFacility);
// get single facility
router.get('/:id', facility_controller_1.FacilityController.getSingleFAcility);
exports.FacilityRoutes = router;
