
# Integrate Apple Pay to a React App

This is a simple React app example to demonstrate how to integrate Apple Pay to a React App using Payment Highway.

The demo by default use the Apple Pay JS API.<p>
Changing the env variable REACT_APP_PAYMENT_REQUEST_API the Payment Request API are used instead.

## Configure Your Enviroment 

1. Register your Mechant ID in your Apple Developer account
2. Create a Payment Processing Certificate
    * Request a Certificate Signing Request (CSR) from support@paymenthighway.fi for Apple Pay on your site or app.
    * Sign the CSR in your Apple Developer account and send the Apple Pay Payment Processing Certificate to us.
3. Create Merchant Identity Certificate
4. Register and verify your domain
    * Download Merchant Identity Domain Association to be incorporated in your web site
5. Payment Highway must be configured accordingly
6. Make an Apple Pay debit request to us to charge the card in the Payment Data received from Apple.

for more info [Apple Pay documentation](https://developer.apple.com/documentation/apple_pay_on_the_web/configuring_your_environment)

## Configuration

For the client configuration add a file **.env** in the root of the project with the following variables:
```bash
REACT_APP_MERCHANT_ID='Your merchant id'
REACT_APP_MERCHANT_DISPLAY='Your merchant display'
REACT_APP_API_URL='https://your.api.base.url'
REACT_APP_PAYMENT_REQUEST_API=no
````

## Getting Started ##

Install dependencies:
```bash
$ yarn install
```

Deploy app to S3 bucket
```bash
$ yarn deploy-s3
```

## Demo mode ##

Adding the variable REACT_APP_DEMO_STEPS=yes in the .env file the **ShoppingCartStepByStep.js** is used for demo  purpose.

Open the file **ShoppingCartStepByStep.js** and follow the instructions:
* Step 1: Show the Apple Pay Button
* Step 2: Perform Apple Pay Payment 

# AWS Lambdas

In the [repository paymenthighway-merchant-backend-demo](https://github.com/PaymentHighway/paymenthighway-merchant-backend-demo) you can find the server implementation for the demo. 

---

### References

[Payment Highway API documentation](https://dev.paymenthighway.io/)

[Getting Started with Apple Pay](https://developer.apple.com/apple-pay/get-started/)

[Apple Pay on the web](https://developer.apple.com/documentation/apple_pay_on_the_web)

[Apple Pay JS API](https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api)

[Payment Request API (W3C)](https://www.w3.org/TR/payment-request/)

[Introducing the Payment Request API for Apple Pay](https://webkit.org/blog/8182/introducing-the-payment-request-api-for-apple-pay/)

