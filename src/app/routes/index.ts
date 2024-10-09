import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { FacilityRoutes } from '../modules/facility/facility.route'
import { BookingRoutes } from '../modules/booking/booking.route'
import { UserRoutes } from '../modules/user/user.route'
import { PaymentRoutes } from '../modules/payment/payment.route'

const router = Router()

const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/',
    route: BookingRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes
  }
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
