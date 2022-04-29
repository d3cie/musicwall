import islogged from '../../../../middleware/islogged'
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';


const handler = async (req, res) => {
    if (req.method === 'GET') {
        if (req.isLoggedIn) {
            User.findOne({ _id: req.id })
                .then((user) => {
                    if (user == null) {
                        res.status(401).send({ status: 'error', message: 'User Not Found' })
                        return
                    }




                    res.status(200).send({
                        status: 'success',
                        profile: { id: user._id, username: user.username, profileinfo: user.profileinfo, since: user.since }
                    })

                })
                .catch((err) => { console.log(err); res.status(500).send({ status: 'error', message: 'Internal' }) })
        } else {
            res.status(401).send({ status: 'error', message: 'Not Logged In' });
        }
    }

}


export default connectDB(islogged(handler))


