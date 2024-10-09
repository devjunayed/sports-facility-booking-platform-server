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
exports.initiatePayment = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
const config_1 = __importDefault(require("../../config"));
/* @ts-ignore */
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            total_amount: paymentData.totalPrice,
            currency: 'BDT',
            tran_id: paymentData.transactionId,
            success_url: `${config_1.default.server_api}/payment?transactionId=${paymentData.transactionId}&status=success`,
            fail_url: `${config_1.default.server_api}/payment?transactionId=${paymentData.transactionId}&status=failed`,
            cancel_url: `${config_1.default.server_api}/payment?transactionId=${paymentData.transactionId}&status=canceled`,
            ipn_url: `${config_1.default.server_api}/payment/ipn`,
            shipping_method: 'Courier',
            product_name: 'somehting',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: paymentData.customerEmail,
            cus_add1: paymentData.customerAddress,
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: paymentData.customerPhone,
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new sslcommerz_lts_1.default(config_1.default.store_id, config_1.default.store_pass, false);
        const GatewayPageURL = yield sslcz.init(data).then((apiResponse) => {
            return apiResponse.GatewayPageURL;
        });
        return GatewayPageURL;
    }
    catch (error) {
        throw new Error('Payment initiation failed!');
    }
});
exports.initiatePayment = initiatePayment;
