import authorization from "../../../../middleware/authorization"
import User from '../../../../models/user';
import connectDB from '../../../../middleware/mongodb';


const handler = async (req, res) => {  
     if (req.method === 'POST') {

    const data = req.body
     const filter = {_id: req.id}
     const update = {$push:{walls:{
         songs:data?.songs,
         albums:data?.albums,
         artists:data?.artists
          
     }}}
     
  
     User.findOneAndUpdate(filter, update).then(() => {res.status(200).send({status: 'success', message:'Added New Wall.'})})
                                          .catch((err)=>{console.log(err); res.status(500).send({status: 'error'})})
}
else {
     res.status(422).send('req_method_not_supported');
   }
}

export default connectDB(authorization(handler))
