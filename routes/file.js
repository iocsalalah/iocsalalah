import express from "express";
const fileRouter = express.Router();
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY, // your AWS access id
  secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY, // your AWS access key
});

function getSubstringAfter(inputString, specifiedString) {
  const index = inputString.indexOf(specifiedString);
  if (index !== -1) {
    // If the specified string is found
    return inputString.substring(index + specifiedString.length);
    // or use inputString.slice(index + specifiedString.length);
  } else {
    // If the specified string is not found, return the original string or an empty string, depending on your requirements.
    return inputString;
  }
}

async function uploadFile(file) {
  const params = {
    Bucket: process.env.REACT_APP_BUCKET_NAME, // bucket you want to upload to
    Key: `${Date.now()}-${file.name}`, // put all image to fileupload folder with name scanskill-${Date.now()}${file.name}`
    Body: file.data,
    ACL: "public-read",
    ContentType: file.mimetype, // set the content type of the file
  };
  const data = await s3.upload(params).promise();
  return data.Location; // returns the url location
}

fileRouter.get("/photo/:file", async (req, res) => {
  const params = {
    Bucket: process.env.REACT_APP_BUCKET_NAME, // bucket you want to upload to
    Key: req.params.file,
  };
  s3.getObject(params, (err, data) => {
    if (err) {
      console.error("Error downloading image:", err);
      return;
    }

    // Convert the image data to base64
    const base64Image = Buffer.from(data.Body).toString("base64");
    res.send(base64Image);
  });
});

fileRouter.post("/upload", async (req, res) => {
  console.log("\n\n");
  console.log("a post request to file/upload is running...");
  console.log("With req.body:");
  console.log(req.body);
  // the file when inserted from form-data comes in req.files.file
  const fileLocation = await uploadFile(req.files.file);

  // returning fileupload location
  console.log("request end...");
  console.log("\n\n");
  return res.status(200).json({ location: fileLocation });
});

fileRouter.post("/delete", async (req, res) => {
  const key = getSubstringAfter(req.body.url, "amazonaws.com/");
  const params = {
    Bucket: process.env.REACT_APP_BUCKET_NAME,
    Key: key,
  };
  const response = await s3.deleteObject(params).promise();
  return res.send(response);
});

export default fileRouter;
