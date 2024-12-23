import islogged from '../../../../middleware/islogged'
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';


const handler = async (req, res) => {
    if (req.method === 'GET') {
        if (req.isLoggedIn) {
            User.findOne({ _id: req.id },)
                .then((user) => {
                    if (user == null) {
                        res.status(200).send({ status: 'error', message: 'User Not Found' })
                        return
                    }


                    user.pins = user.pins.filter((v, i, a) => a.findIndex(v2 => (v2.username === v.username)) === i)
                    user.pinnedby = user.pinnedby.filter((v, i, a) => a.findIndex(v2 => (v2.username === v.username)) === i)

                    // console.log('resolved', (date_received - Date.now()))
                    res.status(200).send({
                        status: 'success',
                        profile: {
                            username: user.username,
                            walls: user.walls,
                            pins: user.pins,
                            points: user.points,
                            pinnedby: user.pinnedby,
                            notifications: user.notifications,
                            since: user.since,
                            profileinfo: user.profileinfo
                        }
                    })

                })
                .catch((err) => { console.log(err); res.status(500).send({ status: 'error', message: 'Internal' }) })
        } else {
            res.status(401).send({ status: 'error', message: 'Not Logged In' });
        }
    }

}


export default connectDB(islogged(handler))


