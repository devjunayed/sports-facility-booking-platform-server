"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
const http_status_1 = __importDefault(require("http-status"));
function sendResponse(res, { statusCode, success, token, message, data }) {
    const responseData = {
        success,
        statusCode,
        message,
        data,
    };
    if (token) {
        responseData.token = token;
    }
    if ((Array.isArray(data) && (data === null || data === void 0 ? void 0 : data.length) === 0) || !data) {
        responseData.data = (Array.isArray(data) ? [] : null);
        responseData.message = 'No Data Found';
        responseData.statusCode = http_status_1.default.NOT_FOUND;
        responseData.success = false;
    }
    res.status(responseData.statusCode).json(responseData);
}
