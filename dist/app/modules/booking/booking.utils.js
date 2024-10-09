"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlot = getSlot;
const booking_model_1 = require("./booking.model");
function getSlot(date, facilityId) {
    return __awaiter(this, void 0, void 0, function* () {
        // slots
        const slots = [];
        // Generating slots between 8:00am to 4:00pm with 2-hour intervals
        for (let i = 8; i < 16; i += 2) {
            const startTime = i;
            const endTime = i + 2;
            slots.push({
                startTime: `${startTime < 10 ? `0${startTime}` : startTime}:00`, // e.g. "08:00"
                endTime: `${endTime < 10 ? `0${endTime}` : endTime}:00`, // e.g. "10:00"
            });
        }
        // Fetch all bookings for the given date
        const bookings = yield booking_model_1.Booking.find({ date });
        // Filter out already booked slots
        const availableSlots = slots.filter((slot) => {
            return !bookings.some((booking) => booking.startTime === slot.startTime &&
                booking.endTime === slot.endTime &&
                `${booking.facility}` === facilityId);
        });
        // Return only available slots
        return availableSlots;
    });
}
