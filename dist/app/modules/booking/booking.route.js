"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// checking availability of time
router.get('/check-availability', booking_controller_1.BookingController.checkAvailability);
// creating booking
router.post('/bookings', (0, auth_1.default)('user'), booking_controller_1.BookingController.createBooking);
// getting all bookings
router.get('/bookings', (0, auth_1.default)('admin'), booking_controller_1.BookingController.getAllBookings);
// get user bookings
router.get('/bookings/user', (0, auth_1.default)('user'), booking_controller_1.BookingController.getUserBookings);
// get user bookings
router.delete('/bookings/:id', (0, auth_1.default)('user'), booking_controller_1.BookingController.canceleBookings);
exports.BookingRoutes = router;
