import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const post = (path, data, errorMessage) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: baseUrl + path,
            data: data,
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            if (response.status === 200) {
                resolve(response.data);
            } else {
                reject(new Error(errorMessage));
            }
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });   
}

export const performValidation = (url, merchantIdentifier, displayName, domain) => {
    const data = {
        url: url,
        body: {
            merchantIdentifier: merchantIdentifier,
            displayName: displayName,
            initiative: "web",
            initiativeContext: domain
        }
    }   
    return post('/session/create', data, 'Could not get session')
}

export const performApplePayDebit = (amount, currency, payment_data) => {
    const data = {
        payment_data: payment_data,
        amount: amount,
        currency: currency
    }   
    return post('/applepay/debit', data, 'Could not perform debit')
}
