import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import {CfnOutput, CfnParameter, Duration} from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expiration),
      }]
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkStarterQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // create an s3 bucket 3 ways:
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled',
        }]
      }
    });

    const duration = new CfnParameter(this, 'duration', {
        type: 'Number',
        default: 6,
        description: 'Number of days before objects expire in the L2 bucket',
        minValue: 1,
        maxValue: 10,
    })

    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      // bucketName: 'testt',
      lifecycleRules: [{
        // expiration: Duration.days(2),
        expiration: Duration.days(duration.valueAsNumber)
      }]
    });

    console.log('bucket name: ', myL2Bucket.bucketName);
    new CfnOutput(this, 'MyL2BucketName', {
        value: myL2Bucket.bucketName,
        description: 'The name of the L2 bucket',
        exportName: 'L2BucketName',
    })

    new L3Bucket(this, 'MyL3Bucket', 3);
  }
}
// TODO: Tracking lectures -> Section 13, Lecture 92