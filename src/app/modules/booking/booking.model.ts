import { model, Schema } from 'mongoose'
import { TBooking } from './booking.interface'

const bookingSchema = new Schema<TBooking>({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Facility',
  },
  payableAmount: {
    type: Number,
  },
  transactionId: {
    type: String,
    required: true
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'canceled'],
    default: 'confirmed',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', "Canceled"],
    default: 'Pending',
  },
})

export const Booking = model<TBooking>('Booking', bookingSchema)
