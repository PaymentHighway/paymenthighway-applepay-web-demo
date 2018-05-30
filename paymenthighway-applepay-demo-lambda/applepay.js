import { PaymentAPI } from 'paymenthighway';
import responseJson from './responseJson';

export const debit = async (event, context, callback) => {
  const serverlessRequest = JSON.parse(event.body) || {};
  return executeDebit(serverlessRequest);
};
  
const executeDebit = (serverlessRequest) => new Promise((resolve, reject) => {

  const phServiceUrl = process.env.PH_SERVICE_URL;
  const phKey = process.env.PH_KEY;
  const phSecret = process.env.PH_SECRET;
  const phAccount = process.env.PH_ACCOUNT;
  const phMerchant = process.env.PH_MERCHANT;

  let paymentAPI = new PaymentAPI(
    phServiceUrl,
    phKey,
    phSecret,
    phAccount,
    phMerchant
  );

  paymentAPI
    .initTransaction()
    .then((response) => {
      return paymentAPI.debitApplePayTransaction(response.id, serverlessRequest);
    })
    .then((response) => {
      console.info('successful response from Payment Highway (Apple Pay Debit):', JSON.stringify(response));
      resolve(responseJson(200, response.result));
    })
    .catch((error) => {
      console.error(error);
      reject(err);
    });
});
