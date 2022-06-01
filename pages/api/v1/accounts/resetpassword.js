import connectDB from '../../../../middleware/mongodb';
import bcrypt from 'bcryptjs'
import User from '../../../../models/user';
import jwt from 'jsonwebtoken'
import sendConfirmationCodeToEmail from '../../../../middleware/sendconfirmationemail';
const JWT_SECRET = process.env.TOKEN_SECRET


const passwordValidator = (password) => {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (regex.test(password) && password !== " ") {
        return true
    }
    return false
}
const getAndValidateUser = async (username, email) => {
    try {
        const user = await User.findOne({ username: username })

        if (!user) {
            return { status: 'error', code: 401, message: "Invalid user details" }
        }
        if (user.email == email) {
            return { status: 'success', user: { email: user.email, passwordhash: user.passwordhash } }
        }
        return { status: 'error', code: 401, message: "Invalid user details" }

    }
    catch (e) {
        console.log(e)
        return { status: 'error', code: 500, message: "Internal Error" }
    }
}
const checkIfPasswordReuse = async (oldPasswordHash, newPassword) => {
    return await bcrypt.compare(newPassword, oldPasswordHash)
}

const storeConfirmationHashInDB = async (confirmationCode) => {

    const PASSWORD_RECOVERY_TOKEN = jwt.sign({
        code: confirmationCode,
    },
        JWT_SECRET,
        { expiresIn: "1h" }
    )

    try {
        await User.findOneAndUpdate({ username: username }, { recoverpasswordhash: PASSWORD_RECOVERY_TOKEN })
        return ({ status: 'success' })

    }
    catch (e) {
        console.log(e)
        return ({ status: 'error', error: 'Internal Error' })
    }
}

const createConfirmationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        // sendConfirmationCodeToEmail("deciee@musicwall.cc", "122543")


        const result = await getAndValidateUser(username, email)
        if (result.status == 'error') {
            if (res.code == 401) {
                res.status(401)
                res.json(result)
                return
            }
            res.status(500)
            res.json(result)
            return
        }

        if (await checkIfPasswordReuse(result.user.passwordhash, password)) {
            console.log
            res.json({
                status: 'error',
                message: 'You cannot reuse an old password.'
            })
            return
        }

        if (!passwordValidator(password)) {
            res.json({
                status: 'error',
                message: 'password should be at least 8 characters and contain one or more character and number.'
            })
            return
        }



        res.json({
            status: 'success',
        })

        // createConfirmationCode()
        // sendEmail()
        // saveTempToDB()

    }
    else {
        res.status(422).send('req_method_not_supported');
    }

}




export default connectDB(handler)






























// const nodemailer = require("nodemailer");





// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);