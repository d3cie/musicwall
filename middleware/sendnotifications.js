import User from "../models/user"
import connectDB from "./mongodb"


const sendnotifications = ({ to, action, message, from }) => {

    const notificationsUpdate = {
        $push: {
            notifications: {
                from: to,
                action: action,
                message: message
            }
        }
    }

    User.findOneAndUpdate({ username: from }, notificationsUpdate).then((user) => {
        if (user == null) {
            console.log('oops')
            return
        }
        console.log(user.notifications)
    })

}


export default sendnotifications