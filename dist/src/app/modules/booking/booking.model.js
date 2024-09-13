"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    facility: {
        type: String,
        required: true,
        ref: 'Facility',
    },
    payableAmount: {
        type: Number,
    },
    isBooked: {
        type: String,
        enum: ['confirmed', 'canceled'],
        default: 'confirmed',
    },
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
