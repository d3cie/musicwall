import authorization from "../../../../middleware/authorization"
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        if (req.body?.profileimage) {


            const filter = { _id: req.id }
            const update = {
                "profileinfo.profileimage": req.body?.profileimage
            }

            User.findOneAndUpdate(filter, update).then(() => { res.status(200).send({ status: 'success', message: 'Updated Profile' }) })
                .catch((err) => { console.log(err); res.status(500).send({ status: 'error' }) })
        } else {
            res.status(403).send({ status: 'error', error: "No image attached" });

        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(authorization(handler))
