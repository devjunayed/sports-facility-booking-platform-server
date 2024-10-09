/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config'
/* @ts-ignore */
import SSLCommerzPayment from 'sslcommerz-lts'

export const initiatePayment = async (paymentData: any) => {
  try {
    const data = {
      total_amount: paymentData.totalPrice,
      currency: 'BDT',
      tran_id: paymentData.transactionId,
      success_url: `${config.server_api}/payment?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `${config.server_api}/payment?transactionId=${paymentData.transactionId}&status=failed`,
      cancel_url: `${config.server_api}/payment?transactionId=${paymentData.transactionId}&status=canceled`,
      ipn_url: `${config.server_api}/payment/ipn`,
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
    }

    const sslcz = new SSLCommerzPayment(
      config.store_id,
      config.store_pass,
      false,
    )

    const GatewayPageURL = await sslcz.init(data).then((apiResponse: any) => {
      return apiResponse.GatewayPageURL
    })

    return GatewayPageURL
  } catch (error) {
    throw new Error('Payment initiation failed!')
  }
}
