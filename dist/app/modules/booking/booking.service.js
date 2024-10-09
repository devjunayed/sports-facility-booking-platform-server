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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const booking_model_1 = require("./booking.model");
const facility_model_1 = require("../facility/facility.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const booking_utils_1 = require("./booking.utils");
const payment_utils_1 = require("../payment/payment.utils");
// check availability
const checkAvailabilityFromDb = (date, facility) => __awaiter(void 0, void 0, void 0, function* () {
    // setting booking date to the current date if no date is provided
    let bookingDate = new Date().toISOString().slice(0, 10);
    if (date) {
        bookingDate = date;
    }
    const slots = yield (0, booking_utils_1.getSlot)(bookingDate, facility);
    return slots;
});
// creating bookings
const createBookingIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req.body;
    data.user = req.user;
    // get facility price
    const facility = yield facility_model_1.Facility.findById(data.facility);
    if (!facility) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Can not find facility associated with the id');
    }
    const facilityPrice = facility.pricePerHour;
    //calculating price
    const endTime = Number(data.endTime.split(':')[0]);
    const startTime = Number(data.startTime.split(':')[0]);
    const payableAmount = (endTime - startTime) * Number(facilityPrice);
    // setting payable amount
    data.payableAmount = Number(payableAmount);
    // getting user by email
    const user = yield user_model_1.User.findOne({ email: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email });
    // setting user id
    data.user = user === null || user === void 0 ? void 0 : user._id;
    // checking if the slot is bookable
    const slots = yield (0, booking_utils_1.getSlot)(data.date, `${facility._id}`);
    const slotAvailable = slots.some((slot) => slot.startTime === data.startTime && slot.endTime === data.endTime);
    // throwing error if slot is not available
    if (!slotAvailable) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Slot is not available!');
    }
    // Transaction id for creating payment
    const transactionId = `TXN-${Date.now()}`;
    data.transactionId = transactionId;
    const result = yield booking_model_1.Booking.create(data);
    // payment 
    const paymentData = {
        transactionId,
        totalPrice: payableAmount,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
        customerAddress: user.address
    };
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
    return { result, paymentSession };
});
// getting all bookings
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate('facility').populate('user');
    return result;
});
// getting user bookings
const getUserBookingsFromDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.isUserExistsByEmail((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email);
    const result = yield booking_model_1.Booking.find({ user: user._id }).populate('facility');
    return result;
});
// cancel bookings
const canceleBookingsIntoDB = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    yield booking_model_1.Booking.findByIdAndUpdate(bookingId, {
        isBooked: 'canceled',
    });
    const result = yield booking_model_1.Booking.findById(bookingId).populate('facility');
    return result;
});
exports.BookingService = {
    checkAvailabilityFromDb,
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB,
    canceleBookingsIntoDB,
};
