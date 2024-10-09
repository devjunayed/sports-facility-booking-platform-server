"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = require("./app/middlewares/notFound");
// creating app
const app = (0, express_1.default)();
// cors
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://sportyfy.devjunayed.xyz'],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"
}));
// middlewares for getting data from the frontend
app.use(express_1.default.json());
// tes route
app.get('/', (req, res) => {
    res.json({
        message: 'Server is running',
    });
});
// using routes
app.use('/api/', routes_1.default);
// global error handler
app.use(globalErrorhandler_1.default);
// api not found
app.use(notFound_1.notFound);
exports.default = app;
