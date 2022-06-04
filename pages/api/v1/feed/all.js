import islogged from '../../../../middleware/islogged'
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';


const handler = async (req, res) => {

    const limit = 10
    const page = parseInt(req.query.page)

    if (req.method === 'GET') {

        const projection = { "username": -1, "profileinfo.displayname": 1, "profileinfo.profileimage": 1, "since": 1, "walls": 1, "profileinfo.countrycode": 1 }


        const result = await User.aggregate([
            {
                '$unwind': {
                    'path': '$walls'
                }
            }, {
                '$sort': {
                    'walls.since': -1
                }
            }, {
                '$project': {
                    'username': -1,
                    'profileinfo.displayname': 1,
                    'profileinfo.profileimage': 1,
                    'since': 1,
                    'walls': 1,
                    'profileinfo.countrycode': 1
                }
            }
        ]).skip(page * limit).limit(limit)
            .catch((err) => { console.log(err); res.status(500).send({ status: 'error', message: 'Internal' }) })

        const response = result.map((user) => (
            {
                username: user.username,
                image: user.profileinfo?.profileimage || null,
                since: user.since,
                walls: [user.walls],
                countrycode: user.profileinfo?.countrycode,
                displayname: user.profileinfo?.displayname || user.username,

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


