import connectDB from '../../../../middleware/mongodb';
import bcrypt from 'bcryptjs'
import User from '../../../../models/user';
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'

const JWT_SECRET = process.env.TOKEN_SECRET


const verifyUser = async (user, password)  =>{
    if (!user){
        return false
    }
    if(await bcrypt.compare(password, user.passwordhash)){
        return true
    }else{
        return false
    }
}
    
const createLoginToken =(user, username) =>{
  
        const JWT_TOKEN = jwt.sign({
            id:user._id.toString(),
            username:username}, 
            JWT_SECRET,
            {expiresIn: "90d"}
        )
        return ({status:'success', token: JWT_TOKEN})
  //remember to refresh the token on each login
}


const handler = async (req, res) => {
    if (req.method === 'POST') {
      const { username, password } = req.body;
      const cookies = new Cookies(req, res)

        if (username && password) {
            const userDocument = await User.findOne( {username: username} ).exec()
            const isUser = await verifyUser(userDocument, password)

            if (!isUser){
                res.status(401)
                res.send({status: 'error', message: 'Invalid Details'})
                return
            }
            
            const logintoken = createLoginToken(userDocument, username).token
     
           
                cookies.set('logintoken', logintoken, {
                    httpOnly: true,
                    maxAge: 86400*60
                })

              res.status(200)
              res.json({status:'success', message: "Logged in successfully"});

        }
        else {
            res.status(422).send({status:'error', error:'Data incomplete'});
        }
    } 
    else {
        res.status(422).send('req_method_not_supported');
      }
  };
  
  export default connectDB(handler);
























    // _verifyLoginToken = async (token) => {

    //     try{
    //         return jwt.verify(token, JWT_SECRET)
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

    // return{
    //     createLoginToken(username, password) {
    //         return _createLoginToken(username, password);
    //     },
    
    //     verifyLoginToken(token){
    //         return _verifyLoginToken(token); //returns true or false
    //     }
    // }





    // var token = jwt.sign({email_id:'123@gmail.com'}, "Stack", {
        // expiresIn: "10h" // it will be expired after 10 hours
        //expiresIn: "20d" // it will be expired after 20 days
        //expiresIn: 120 // it will be expired after 120ms
        //expiresIn: "120s" // it will be expired after 120s
