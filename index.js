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