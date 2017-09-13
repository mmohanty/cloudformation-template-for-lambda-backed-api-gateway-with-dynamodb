# CloudFormation Example for API Gateway With Lambda and DynamoDB

## What?

This template tries to demonstrate a complete microservice that uses AWS
services to create a simple serverless API. It uses CloudFormation to create
the following and relate all of them to one another as needed:

   * API Gateway
      * API Resource (one)
      * API Methods (GET)
   * Lambda Function
      * This is what implements the logic for the service, and the code for the function is also part of this repo.
   * DynamoDB Table
      * Configured to be used by the Lambda function.
   * IAM Roles and Policies
      * So that the API can invoke the function and the function has access to necessary resources.



## Why?

Because it can be really tough getting all of this set up on your own. There
are a number of examples of individual pieces, but I couldn't find examples of
how to wire all of them together.

The goal of this repo is that you can have a single repo that contains the
Lambda code for the service, as well as the configuration for provisioning the
service. The hope is that you could add automated unit testing, and if that
passed, the same repo could build your dev environment, potentially run
integration tests, and then either automatically or manually deploy the API.
Automating all of this will greatly simplify things if your desire is to build
self-contained serverless microservices.


## How to Use It

   1. Setup aws CLI in your machine before you proceed.
   2. Edit parameters in `template/template.json` to fill in your own values.
   3. Change your current directory to `script`.
   4. Run /deploy.sh

If you want to monitor the status of your stack creation on the CLI, you can use this command:

```
aws cloudformation describe-stacks --query='Stacks[*].{ Name: StackName, Status: StackStatus }'
```


## License

This software is released under the MIT license. See [the license file](LICENSE) for more details.

Feel free to take the template and modify it for your own use.
