
import z from 'zod';

const createBookingValidationSchema = z.object({
  date: z.string().min(1, 'Date is required'), 
  startTime: z.string().min(1, 'Start time is required'), 
  endTime: z.string().min(1, 'End time is required'), 
  user: z.string(), 
  facility: z.string().min(1, 'Facility is required'), 
  payableAmount: z.number().optional(), 
  isBooked: z.enum(['confirmed', 'canceled']).default('confirmed'),
})



export const BookingValidation = {
    createBookingValidationSchema
}
