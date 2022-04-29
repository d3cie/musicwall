import authorization from "../../../../middleware/authorization"
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';

const handler = async (req, res) => {  
     if (req.method === 'POST') {

     const filter = {_id: req.id}
     const update = {profileinfo:{
          displayname: req.body?.displayname,
          birthday: req.body?.birthday,
          bio: req.body?.bio,
          sex: req.body?.sex,
          profileimagepath: req.body?.profileimagepath
     }}

     User.findOneAndUpdate(filter, update).then(() => {res.status(200).send({status: 'success', message:'Updated Profile'})})
                                          .catch((err)=>{console.log(err); res.status(500).send({status: 'error'})})
}
else {
     res.status(422).send('req_method_not_supported');
   }
}

export default connectDB(authorization(handler))
