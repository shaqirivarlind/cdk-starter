import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import {CfnOutput, Fn} from 'aws-cdk-lib';

export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;
  public readonly photosBucketArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /*const myBucket = new Bucket(this, 'PhotosBucket2', {
      bucketName: 'my-photo-bucket-1234567890123',
    });

    (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket223423gdfhd')
    // when we change the bucket name (ex: PhotosBucket to PhotosBucket2)
    // aws will create a new resource
    // delete the old one
    // we got the error 'my-photo-bucket-123456789012 already exists in stack'*/

    this.initializeSuffix()

    const photosBucket = new Bucket(this, 'PhotosBucket2', {
      bucketName: `my-photo-bucket-${this.stackSuffix}`,
    });

    // new CfnOutput(this, 'photos-bucket', {
    //   value: photosBucket.bucketArn,
    //   exportName: 'photos-bucket',
    // })
    this.photosBucketArn = photosBucket.bucketArn;
  }

  private initializeSuffix() {
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
    this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId)); // 4 from name of the stack
  }
}