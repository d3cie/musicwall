import islogged from '../../../../middleware/islogged'
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';


const handler = async (req, res) => {
    if (req.method === 'POST') {


        const usernames = req.body.usernames

        const result = await User.find({ username: { $in: usernames } }, { 'profileinfo.profileimage': 1, username: 1, pins: 1, pinnedby: 1, 'profileinfo.displayname': 1 })
            .catch((err) => { console.log(err); res.status(500).send({ status: 'error', message: 'Internal' }) })

        const response = result.map((user) => (
            {
                username: user.username,
                image: user.profileinfo?.profileimage || null,
                id: user._id,
                displayname: user.profileinfo?.displayname || user.username,
                pinnedby: user.pinnedby,
                pins: user.pins
            }
        ))
        res.status(200).send({
            status: 'success',
            body: response
        }
        )

    } else {
        res.status(422).send('req_method_not_supported');
    }
}

// export default handler
export default connectDB(islogged(handler))


