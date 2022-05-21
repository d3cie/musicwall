import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';
import authorization from '../../../../middleware/islogged';


const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        const pinnedUser = { username: req.query.pinneduser }
        const pinningUser = { username: req.username }
        const updatePinnedUser = { $pull: { pinnedby: { username: req.username } } }
        const updateUser = { $pull: { pins: { username: req.query.pinneduser } } }


        if (req.query.pinneduser != '') {


            Promise.all([
                User.findOneAndUpdate(pinnedUser, updatePinnedUser),
                User.findOneAndUpdate(pinningUser, updateUser)
            ])
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({
                        status: 'error',
                        message: 'User not unpinned'
                    })
                })
                .then(() => {
                    res.status(200).send({
                        status: 'success',
                    })
                })
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
}
// export default handler
export default connectDB(authorization(handler))


