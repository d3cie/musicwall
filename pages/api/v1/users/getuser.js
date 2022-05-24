import islogged from '../../../../middleware/islogged'
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';


const handler = async (req, res) => {
    if (req.method === 'GET') {
        const filter = { username: req.query.username }
        User.findOne(filter)
            .then((user) => {
                if (user == null) {
                    res.status(404).send({ status: 'error', message: 'User Not Found' })
                    return
                }
                res.status(200).send({
                    status: 'success',
                    profile: { username: user.username, pins: user.pins, points: user.points, pinnedby: user.pinnedby, since: user.since, profileinfo: user.profileinfo, walls: user?.walls }

                })
            })

            .catch((err) => { console.log(err); res.status(500).send({ status: 'error', message: 'Internal' }) })
    } else {
        res.status(422).send('req_method_not_supported');
    }
}

// export default handler
export default connectDB(islogged(handler))


