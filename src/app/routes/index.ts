import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { FacilityRoutes } from "../modules/facility/facility.route";

const router = Router();


const routes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/facility',
        route: FacilityRoutes
    }
];

routes.forEach(route => router.use(route.path, route.route));

export default router;