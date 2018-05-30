import { performValidation,  performApplePayDebit } from './ApplePayRestClient';
import { merchantIdentifier, merchantDisplay, APPLE_PAY_VERSION_NUMBER } from './PaymentConf';
import {  PaymentStatus } from './PaymentStatus';

export const isPaymentRequestAvailable = () =>  {
    return new Promise((resolve, reject) => {
        try {
            const enabled = window.PaymentRequest ? true : false;
            resolve(enabled);
        }
        catch (err) {
            reject(err);
        }
    })
}

const getPaymentDetails = (currencyCode, items, label, amount) => {
    return {
        displayItems: items.map((item) => {
            return { 
                label: item.label,
                amount: { 
                    value: `${Number(item.amount).toFixed(2)}`,
                    currency: currencyCode
                }
            }
        }),
        total: {
            label: label,
            amount: { value: `${Number(amount).toFixed(2)}`, currency: currencyCode }
        }
    }
}

const applePayMethod = {
    supportedMethods: "https://apple.com/apple-pay",
    data: {
        version: APPLE_PAY_VERSION_NUMBER,
        merchantIdentifier: merchantIdentifier,
        merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
        supportedNetworks: ["masterCard", "visa"],
        countryCode: "FI"
    }
};

const paymentOptions = {
    requestPayerName: false,
    requestPayerEmail: false,
    requestPayerPhone: false,
    requestShipping: false,
    shippingType: "shipping",
};

const paymentRequestValidateMerchant = (event) => {
    const sessionPromise = performValidation(event.validationURL, 
                                             merchantIdentifier,
                                             merchantDisplay,
                                             window.location.hostname);
    event.complete(sessionPromise);  
}

const paymentRequestComplete = (resolve, reject, instrument, isError) => {
    const resolveStatus = !isError ? PaymentStatus.SUCCESS : PaymentStatus.FAILURE;
    const completeStatus = !isError ? "success" : "failure";
    instrument.complete(completeStatus)
        .then(() => {
            resolve(resolveStatus);  
        })
        .catch ((err) => {
            console.log("Complete error:", err);
            reject(err);  
        })
}

const paymentRequestPerformPayment = (resolve, reject, showPromise, currencyCode, amount) => {
            
    showPromise.then( (instrument) => {
        // amount must be provided in cents
        performApplePayDebit(amount*100, currencyCode, instrument.details.token.paymentData)
            .then((response) => {        
                if (response.code === 100) {
                    console.log("Payment done!");
                    paymentRequestComplete(resolve, reject, instrument);
                } else {
                    console.log("Payment error in response ", JSON.stringify(response));
                    paymentRequestComplete(resolve, reject, instrument, true);
                }
            })
            .catch((err) => {
                console.log("Payment error ", JSON.stringify(err));
                paymentRequestComplete(resolve, reject, instrument, true);
            });
    },
    (failure) => {
        resolve(failure.name === 'AbortError' ? PaymentStatus.CANCEL : PaymentStatus.FAILURE);             
    })
}

export const performApplePayPayment = (currencyCode, items, label, amount) => {
    return new Promise((resolve, reject) => {
        try {
            const paymentDetails = getPaymentDetails(currencyCode, items, label, amount);         
            const paymentRequest = new window.PaymentRequest([applePayMethod], paymentDetails, paymentOptions);

            paymentRequest.onmerchantvalidation = paymentRequestValidateMerchant;
            
            const showPromise = paymentRequest.show();

            paymentRequestPerformPayment(resolve, reject, showPromise, currencyCode, amount);
        } catch (err) {
            reject(err);
        }
    })
}