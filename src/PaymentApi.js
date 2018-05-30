import { performApplePayPayment, isApplePayJsAvailable } from './ApplePayJsHandler';
import { performApplePayPayment as performApplePayPaymentPaymentRequest, isPaymentRequestAvailable } from './PaymentRequestHandler';
import { paymentRequestApi } from './PaymentConf';

export { PaymentStatus } from './PaymentStatus';

console.log(`Using ${paymentRequestApi ? "Payment Request": "Apple Pay JS"} API!`)

export const isApplePayAvailable = () =>  {
    return paymentRequestApi ? isPaymentRequestAvailable() : isApplePayJsAvailable()
}

export const performPayment = (currencyCode, items, label, amount) => {
    return paymentRequestApi ?
        performApplePayPaymentPaymentRequest(currencyCode, items, label, amount) : 
        performApplePayPayment(currencyCode, items, label, amount)
}