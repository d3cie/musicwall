import authorization from "../../../../middleware/authorization"
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';
import AWS from 'aws-sdk'
const fs = require('fs');

// S3_ACCESS_KEY:'AKIA3FDUH43BWQA4LTRC',
// S3_SECRET:'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',



const handler = async (req, res) => {
    if (req.method === 'POST') {
        if (req.body?.profileimage) {
            const fileBase64 = req.body.profileimage

            var buf = Buffer.from(fileBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64')



            // const buffer = Buffer.from(fileBlob, "base64");
            // const file = new File([fileBlob], "filename");
            // fileBlob.name = 'image.jpeg';
            // fileBlob.lastModified = new Date();

            // const file = fs.writeFile("out.png", fileBlob, 'base64', function (err) {
            //     console.log(err);
            // });
            const filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            const s3 = new AWS.S3({
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET
            })
            const params = {
                Bucket: process.env.S3_IMAGE_BUCKET_NAME,
                Key: filename,
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg'
            }

            s3.upload(params, function (err, data) {
                if (err) {
                    throw err;
                }

                const filter = { _id: req.id }
                const update = {
                    "profileinfo.profileimage": data.Location
                }

                User.findOneAndUpdate(filter, update).then(() => { res.status(200).send({ status: 'success', message: 'Updated Profile' }) })
                    .catch((err) => { console.log(err); res.status(500).send({ status: 'error' }) })


            });




        } else {
            res.status(403).send({ status: 'error', error: "No image attached" });

        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(authorization(handler))
