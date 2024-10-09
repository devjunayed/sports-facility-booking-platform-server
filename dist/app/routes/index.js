"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const facility_route_1 = require("../modules/facility/facility.route");
const booking_route_1 = require("../modules/booking/booking.route");
const user_route_1 = require("../modules/user/user.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/facility',
        route: facility_route_1.FacilityRoutes,
    },
    {
        path: '/',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes
    }
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
