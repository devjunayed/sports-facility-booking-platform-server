"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createBookingValidationSchema = zod_1.default.object({
    date: zod_1.default.string().min(1, 'Date is required'),
    startTime: zod_1.default.string().min(1, 'Start time is required'),
    endTime: zod_1.default.string().min(1, 'End time is required'),
    user: zod_1.default.string(),
    facility: zod_1.default.string().min(1, 'Facility is required'),
    payableAmount: zod_1.default.number().optional(),
    isBooked: zod_1.default.enum(['confirmed', 'canceled']).default('confirmed'),
    paymentStatus: zod_1.default.enum(['Pending', 'Paid', "Canceled"]).default('Pending'),
});
exports.BookingValidation = {
    createBookingValidationSchema,
};
