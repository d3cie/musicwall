import islogged from '../../../../middleware/islogged'
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';


const handler = async (req, res) => {
    if (req.method === 'GET') {
        User.find({}, { username: -1, since: -1 })
            .then((users) => {

                res.status(200).send({
                    users: users
                })
            })
    } else {
        res.status(422).send('req_method_not_supported');
    }
}

// export default handler
export default connectDB(handler)

