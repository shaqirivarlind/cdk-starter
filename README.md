# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template






# AWS CDK Common Commands

Use these commands with `sudo` and the `--profile udemy` flag to avoid permission or credential issues.

```bash
# 1) Create a new CDK project in TypeScript (run once to initialize a project)
sudo cdk init app \
  --language typescript \
  --profile udemy

# 2) Prepare AWS environment for CDK (creates S3 bucket & IAM roles for deployments)
sudo cdk bootstrap \
  --profile udemy

# 3) Generate the CloudFormation template (all stacks or a specific one)
sudo cdk synth \
  --profile udemy

# 4) Deploy the synthesized template (create/update resources in AWS)
sudo cdk deploy \
  --profile udemy \
  --outputs-file output.json \
  --all

# 5) Compare local code with what is currently deployed
sudo cdk diff \
  --profile udemy

# 6) List all stacks defined in this CDK app
sudo cdk list 
  --profile udemy

# 7) Remove resources from AWS (destroy all stacks or a specific one)
sudo cdk destroy \
  --profile udemy

# 8) Diagnose your CDK setup (check versions, environment, etc.)
sudo cdk doctor \
  --profile udemy
```

> **Optional stack name:** You can specify a stack by adding its name before `--profile`.  
> Example: `sudo cdk deploy MyStack --profile udemy` will deploy only `MyStack`.  
> If omitted, the command applies to all stacks.
> * if you have cdf parameters like duration you can use like this `cdk deploy --profile udemy --parameters duration=9`



# Optional: Bootstrap with explicit region
`sudo cdk bootstrap aws://ACCOUNT_ID/eu-central-1 --profile udemy`

# Verify CloudFormation Stacks
To list your CloudFormation stacks in the region you bootstrapped, run:

```
aws cloudformation describe-stacks \
  --region eu-central-1 \
  --profile udemy
 ```



# AWS Cognito Admin Set User Password
This document explains how to set a permanent password for a user in an AWS Cognito User Pool using the AWS CLI.
## Command
```
sudo aws cognito-idp admin-set-user-password \
  --user-pool-id eu-central-1_4El5exXPD \
  --username dnilra \
  --password "uuud9MTE.688KRF" \
  --permanent \
  --region eu-central-1 \
  --profile udemy
```
## Parameters
- --user-pool-id: The ID of the Cognito User Pool.
- --username: The username of the user whose password will be set.
- --password: The new password for the user.
- --permanent: Marks the password as permanent (user will not be required to change it on first login).
- --region: AWS region where the User Pool is located.
- --profile: AWS CLI profile to use for authentication.

## on URL you se old FE or deployed one (CloudFormation -> Stacks -> [StackNAme] -> Distribution)
`aws cloudfront create-invalidation --distribution-id {id} --paths "/* --profile udemy"`
