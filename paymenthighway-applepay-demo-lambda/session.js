import { isValidApplePayGateway } from './validateApplePayGateway';
import responseJson from './responseJson';
import request from 'request';

export const create = async (event, context, callback) => {

    const serverlessRequest = JSON.parse(event.body) || {url: '', body: {}};
    const endpointURL = serverlessRequest.url || '';

    if (!isValidApplePayGateway(endpointURL)) {
        callBack(null, responseJson(400, {message: 'Hello Sad World!'}))
        return
    }
    return createSession(endpointURL, serverlessRequest.body);
};

const createSession = (endpointURL, body) => new Promise((resolve, reject) => {

  const merchIdentityCert = process.env.MERCHANT_IDENTITY_CERT;
  const merchIdentityKey = process.env.MERCHANT_IDENTITY_KEY;

  const options = {
    method: 'POST',
    uri: endpointURL,
    cert: merchIdentityCert,
    key: merchIdentityKey,
    body: body || {},
    json: true,
  };

  request(options, function (error, response, body) {

    let serverlessResponse = {};

    if (error) {
      console.error('session create failed:', error);
      serverlessResponse = responseJson(500, {"message": "Hello Sad World!" });
    } else {
      console.error('session create succeeded:', body);

      if (body.statusCode === '400') {
        console.info('statusCode === 400');
        serverlessResponse = responseJson(400, {"message": body.statusMessage });
      } else {
        serverlessResponse = responseJson(200, body);
      }
    }

    resolve(serverlessResponse);
  });

});
