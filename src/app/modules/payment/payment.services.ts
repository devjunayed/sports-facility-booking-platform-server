import { Booking } from '../booking/booking.model'
import { join } from 'path'
import { readFileSync } from 'fs'
import { TFacility } from '../facility/facility.interface'

const confirmationService = async (transactionId: string, status: string) => {
  let message = ''
  const result = await Booking.findOne({ transactionId }).populate('facility')

  if (status === 'success') {
    await Booking.findOneAndUpdate({ transactionId }, { paymentStatus: 'Paid' })
    message = 'Successfully Paid ✅'
  } else if (status === ' failed') {
    message = 'Payment Failed ❌'
  } else {
    message = 'Payment Canceled ❌'
  }

 

  const filePath = join(__dirname, '../../../views/confirmation.html')
  let template = readFileSync(filePath, 'utf-8')


  const facilityName = (result?.facility as unknown as TFacility).name as string || "";

  template = template.replace('{{message}}', message || "")
  template = template.replace('{{date}}', result?.date || "")
  template = template.replace('{{facilityName}}', `${facilityName}` || "")
  template = template.replace('{{startTime}}', result?.startTime || "")
  template = template.replace('{{endTime}}', result?.endTime || "")
  template = template.replace('{{cost}}', `${result?.payableAmount} BDT`)
  return template
}

export const paymentSerivices = { confirmationService }
