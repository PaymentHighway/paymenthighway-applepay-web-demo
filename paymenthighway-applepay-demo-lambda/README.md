# Integrate Apple Pay to a React App: AWS Lambdas

This is the server implementation for the demo how integrate Apple Pay to a React App using Payment Highway.

There are 2 lambdas implemented:
1. **session.js** : Request a valid Apple Pay Session from the Apple Pay server.
2. **applepay.js** : Perfom the actual payment(Debit) via Payment Highway API.

---

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)


### Usage

To run unit tests on your local

``` bash
$ npm test
```

To run a function on your local

``` bash
$ serverless invoke local --function hello
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

Run your tests

``` bash
$ npm test
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).

Deploy your project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function hello
```