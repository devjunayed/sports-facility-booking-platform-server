"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createUserValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: 'Name is required!',
            invalid_type_error: 'Name must be a string!',
        }),
        email: zod_1.default
            .string({
            required_error: 'Email is required!',
            invalid_type_error: 'Email must be a string!',
        })
            .email('Invalid email format!'),
        password: zod_1.default
            .string({
            required_error: 'Password is required!',
            invalid_type_error: 'Password must be a string!',
        })
            .min(6, 'Password must be at least 6 characters long!'),
        phone: zod_1.default
            .string({
            required_error: 'Phone number is required!',
            invalid_type_error: 'Phone must be a string!',
        })
            .min(10, 'Phone number must be at least 10 digits long!'),
        role: zod_1.default.enum(['admin', 'user'], {
            required_error: 'Role is required!',
            invalid_type_error: "Role must be either 'admin' or 'user'!",
        }),
        address: zod_1.default.string({
            required_error: 'Address is required!',
            invalid_type_error: 'Address must be a string!',
        }),
    }),
});
exports.UserValidation = {
    createUserValidation,
};
