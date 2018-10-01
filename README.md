# Using AWS S3 Buckets in a NodeJS App
Amazon S3 is a cloud computing web service offered by [Amazon Web Services](https://aws.amazon.com/), accessible via an API.

The following guide will explain how to set up a simple demo app using the AWS SDK.

First, you'll need to know a few concepts:
- **S3 Bucket**: The basic storage unit for the S3 service. You store different types of objects (data) in these buckets. Buckets and objects can be created, listed, and retrieved using a REST-style HTTP interface or the AWS SDK.
- **Access Key ID**: Allows an application or user to access a set of pre-configured AWS resources, like an S3 Bucket.
- **Secret Access Key**: Is the secret part of the Access Key ID. Think of it as a password for a specific Access Key ID. They must be used always in pairs.

## Step 1: Get your Amazon API keys
The easiest way to obtain an access key pair is to create them for your AWS Console.

In the top-bar, click your user account.

[[IMAGE]]

Click in "My security credentials" and "Access keys", finally, click "Create New Access Key".

[[IMAGE]]

A modal window should pop-up and it will tell you that your access key pairs have been created. Click in "Show access key" to see both keys, or download them to your computer.

[[IMAGE]]

Save the keys in a secure place. You will need them later.

## Step 2: Create an S3 Bucket
On the top-bar, go to "Services". then under the "Storage" heading click "S3" and then click on "Create Bucket".

![Create S3 bucket](https://github.com/whatterz/prototype-nodejs-aws/blob/master/docs/images/aws-s3-bucket-list-1.png)

Then, fill the information required in the form. The bucket name is required and must be unique.

![Configure bucket's name and region](https://github.com/whatterz/prototype-nodejs-aws/blob/master/docs/images/aws-configure-s3-bucket-1.png)

![Configure bucket's properties](https://github.com/whatterz/prototype-nodejs-aws/blob/master/docs/images/aws-configure-s3-bucket-2.png)

![Configure bucket's permissions](https://github.com/whatterz/prototype-nodejs-aws/blob/master/docs/images/aws-configure-s3-bucket-3.png)

![Review and save bucket's configuration](https://github.com/whatterz/prototype-nodejs-aws/blob/master/docs/images/aws-configure-s3-bucket-4.png)

For this example we will leave the properties and permissions with the default values, so click "Next" through all the screens and then "Create bucket".

![S3 Bucket list](https://github.com/whatterz/prototype-nodejs-aws/blob/master/docs/images/aws-s3-bucket-list-2.png)

Your bucket will show up on your Amazon S3 list. Take a note of the bucket name, if you haven't already, as it will be used in your application.

## Step 3: Create a NodeJS project
To start, you will need to create a basic project.

Create a blank project using the following command and entering the required information (project name, repository, license, etc.).

```
npm init
```

Next, create a folder in the root directory with the name "data" and create a text file called `file.txt` and enter some dummy content.

In Terminal, go to the root folder of your app and using the following command, install the [AWS SDK module](https://www.npmjs.com/package/aws-sdk) for JavaScript.

```
npm install aws-sdk --save
```

Since we will be using environment variables, rather than hard-coding key-pairs and bucket names into our app, we also need to install the [dotenv module](https://www.npmjs.com/package/dotenv), using the following command:

```
npm install dotenv --save
```

Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. Storing configuration in the environment separate from code is based on [The Twelve-Factor App](http://12factor.net/config) methodology.

We also need a start file for the application. In the root directory, create a file called `start.js`. The file can be empty for now.

Now, to create the file that we will use to upload a file to the S3 bucket. In the root directory, create a file called `index.js` with the following content:

```javascript
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

// configure the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

let s3 = new AWS.S3();
let filePath = "./data/file.txt";

// configure parameters
let params = {
  Bucket: process.env.AWS_BUCKET,
  Body: fs.createReadStream(filePath),
  Key: "folder/" + Date.now() + "_" + path.basename(filePath)
};

// upload to S3
s3.upload(params, (err, data) => {
  //handle error
  if (err) {
    console.log("Error:", err);
  }

  //success
  if (data) {
    console.log("Uploaded to:", data.Location);
  }
});
```

Next, create a file named `.env` with the following content. Add your `access key ID`, `secret access key` and `bucket name` you rcreated earlier.
```
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
```

Once everything is saved, you're good to start. In Terminal, type the following command:
```
npm start
```

Next, in Terminal type the following command:
```
node index.js
```

If successful, you should see a message in the console stating the file has been uploaded and where it has been uploaded to. If you go to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/home) you should be able to see your file listed.

### Kudos
Thanks goes to [Gonzalo P.](https://github.com/gonzalompp) for his [Medium post](https://medium.com/codebase/using-aws-s3-buckets-in-a-nodejs-app-74da2fc547a6) on the subject.
