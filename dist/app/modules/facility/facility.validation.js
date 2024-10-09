"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createFacilityValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: 'Facility name is required',
            invalid_type_error: 'Facility name is invalid',
        }),
        image: zod_1.default.string({
            required_error: 'Facility image is required',
            invalid_type_error: 'Facility image is invalid',
        }),
        description: zod_1.default.string({
            required_error: 'Facility description is required',
            invalid_type_error: 'Facility description is invalid',
        }),
        pricePerHour: zod_1.default.number({
            required_error: 'Facility price per hour is required',
            invalid_type_error: 'Facility price per hour is invalid',
        }),
        location: zod_1.default.string({
            required_error: 'Facility location is required',
            invalid_type_error: 'Facility location is invalid',
        }),
    }),
});
const updateFacilityValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string({
            invalid_type_error: 'Facility name is invalid',
        })
            .optional(),
        description: zod_1.default
            .string({
            invalid_type_error: 'Facility description is invalid',
        })
            .optional(),
        pricePerHour: zod_1.default
            .number({
            invalid_type_error: 'Facility price per hour is invalid',
        })
            .optional(),
        location: zod_1.default
            .string({
            invalid_type_error: 'Facility location is invalid',
        })
            .optional(),
    }),
});
exports.FacilityValidation = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema,
};
