import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';


class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expiration)
      }]
    });

  }
}

export class CdkStarterStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CfnBucket(this, "MyL1Bucket_1", {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled'
        }]
      }
    });

    new Bucket(this, 'MyL2Bucket_1', {
      lifecycleRules: [{
        expiration: Duration.days(2)
      }]
    });

    new L3Bucket(this, 'MyL3Bucket_1', 3);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkStarterQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
