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
exports.paymentSerivices = void 0;
const booking_model_1 = require("../booking/booking.model");
const path_1 = require("path");
const fs_1 = require("fs");
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    let message = '';
    const result = yield booking_model_1.Booking.findOne({ transactionId }).populate('facility');
    if (status === 'success') {
        yield booking_model_1.Booking.findOneAndUpdate({ transactionId }, { paymentStatus: 'Paid' });
        message = 'Successfully Paid ✅';
    }
    else if (status === ' failed') {
        message = 'Payment Failed ❌';
    }
    else {
        message = 'Payment Canceled ❌';
    }
    const filePath = (0, path_1.join)(__dirname, '../../../views/confirmation.html');
    let template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    const facilityName = (result === null || result === void 0 ? void 0 : result.facility).name || "";
    template = template.replace('{{message}}', message || "");
    template = template.replace('{{date}}', (result === null || result === void 0 ? void 0 : result.date) || "");
    template = template.replace('{{facilityName}}', `${facilityName}` || "");
    template = template.replace('{{startTime}}', (result === null || result === void 0 ? void 0 : result.startTime) || "");
    template = template.replace('{{endTime}}', (result === null || result === void 0 ? void 0 : result.endTime) || "");
    template = template.replace('{{cost}}', `${result === null || result === void 0 ? void 0 : result.payableAmount} BDT`);
    return template;
});
exports.paymentSerivices = { confirmationService };
