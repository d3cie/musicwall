import connectDB from '../../../../middleware/mongodb';
import bcrypt from 'bcryptjs'
import User from '../../../../models/user';
import login from '../accounts/login'

const userNameValidator = (userName) => {

    var regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,20}$/;

    if (regex.test(userName) === false) {
        return ({
            status: 'error',
            error: 'Username Invalid'
        })
    }

    if (regex.test(userName) === true && userName !== " ") {
        return ({
            status: 'ok'
        })
    }
}

const passwordValidator = (passWord) => {



    if (passWord.length < 8) {
        return ({
            status: 'error',
            error: 'Password should be at least 8 characters.'
        })
    }

    if (passWord.length > 8) {
        return ({
            status: 'ok'
        })
    }
}

const emailValidator = (email) => {

    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (regex.test(email) === false) {
        return ({
            status: 'error',
            error: 'Invalid email address.'
        })
    }

    if (regex.test(email) === true && email !== " ") {
        return ({
            status: 'ok'
        })
    }
}

const createUser = async (username, password, email) => {
    const validateUsername = userNameValidator(username)
    const validatePassword = passwordValidator(password)
    const validateEmail = emailValidator(email)

    if (validateUsername.status != 'ok') {
        return validateUsername
    }
    if (validatePassword.status != 'ok') {
        return validatePassword
    }
    if (validateEmail.status != 'ok') {
        return validateEmail
    }

    try {
        let passwordhash = await bcrypt.hash(password, 10)

        await User.create({
            username,
            email,
            passwordhash,
            profileinfo: {
                displayname: null,
                birthday: null,
                bio: null,
                sex: null,
                profileimagepath: null
            }
        })

        return ({ status: 'success' })

    } catch (error) {
        if (error.code === 11000) {
            console.log(error)
            return ({ status: 'error', error: 'Username already in use' })
        }
        else {
            console.log(error)
            return ({ status: 'error', error: 'Internal Error' })

        }
    }
}




const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;
        if (username && email && password) {
            const newUser = await createUser(username.toLowerCase(), password, email)

            if (newUser.status == 'error') {
                res.send(newUser)
            }
            else if (newUser.status == 'success') {
                login(req, res)

            }

        }
        else {
            res.status(422).send({ status: 'error', error: 'Data incomplete' });
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);