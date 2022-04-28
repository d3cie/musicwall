import Cookies from 'cookies'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.TOKEN_SECRET


const authorization = handler => (req, res) => {
    const cookies = new Cookies(req, res)
    const token = cookies.get('logintoken')

    if (!token) {
        
      return res.status(403).send({message:'No Cookie Attached'});
    }
      jwt.verify(token, JWT_SECRET,(err, verifiedJwt) => {
        if(err){
          res.status(403).send({message: err.message})
        
        }else{
            console.log(verifiedJwt)
            req.username = verifiedJwt.username;
            req.id = verifiedJwt.id;
            res.status(200).send({message:'Authorization Successful'})
            return handler(req,res);
        }
      })
   
     
    // } catch {
    //   return res.status(403).send({message:'Invalid Cookie'});
    // }
  };
  export default authorization