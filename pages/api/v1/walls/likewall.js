import authorization from '../../../../middleware/authorization'
import connectDB from '../../../../middleware/mongodb'
import sendnotifications from '../../../../middleware/sendnotifications'
import User from '../../../../models/user'

const handler = async (req, res) => {

    if (req.method === 'POST') {
        const wallId = req.body.wallId
        const username = req.body.username
        const myUsername = req.username

        // const filter = { username: username, walls: { "_id": wallId } }


        // const updateUser = { $push: { pins: { username: req.query.pinneduser } } }

        if (wallId && username) {

            const likedUser = User.findOne({ username: username })

            likedUser.updateOne({ 'walls': { "$elemMatch": { "_id": wallId } } }, { "$push": { 'walls.$.likes': { username: myUsername } } }).then((e) => {
                if (!e.acknowledged) {
                    res.status(200).send({ status: 'error', message: 'Not Liked.' })
                    return
                }
                sendnotifications({ to: myUsername, action: 'like', fromid: req.id, message: wallId, from: username })
                res.status(200).send({ status: 'success', message: 'Liked.' })
            })
                .catch((err) => { console.log(err); res.status(500).send({ status: 'error' }) })

            // User.findOneAndUpdate(filter, update)
        }

    } else {
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(authorization(handler))