import Cookies from 'cookies'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.TOKEN_SECRET


const authorization = handler => (req, res) => {
    const cookies = new Cookies(req, res)
    const token = cookies.get('logintoken')

    if (!token) {
      req.isLoggedIn = false 
      return handler(req,res);
    }

      jwt.verify(token, JWT_SECRET,(err, verifiedJwt) => {
        if(err){
            req.isLoggedIn = false 
            return handler(req,res);
        
        }else{
          req.isLoggedIn = true
            req.username = verifiedJwt.username;
            req.id = verifiedJwt.id;
            return handler(req,res);
        }
      })
  };
  export default authorization