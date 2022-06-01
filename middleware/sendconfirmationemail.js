const AWS = require("aws-sdk");

export default function sendConfirmationCodeToEmail(email, code) {


    AWS.config.update({
        accessKeyId: "AKIA3FDUH43B6R5SLMXC",
        secretAccessKey: "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",
        region: "us-east-1"
    });




    const ses = new AWS.SES({ apiVersion: "2010-12-01" });

    const params = {
        "Source": "no-reply.mail@musicwall.cc",
        "Template": "ResetPassword",
        "ConfigurationSetName": "resetpasswordConfig",
        "Destination": {
            "ToAddresses": [email
            ]
        },
        "TemplateData": `{ \"email\":\"${email}\", \"code\": \"${code}\" }`
    }

    ses.sendTemplatedEmail(params, (err, data) => {
        if (err) { console.log(err, err.stack); return err; };
        return data;
    });
}