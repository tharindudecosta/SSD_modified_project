import jwt from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";

const {JWT_SECRET} = process.env;

const verifyUser = (token,userId) =>{
  const decoded = JSON.stringify(jwtDecode(token));

  if (decoded.userId === userId){
    return true;
  }

  return false;
}

const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  const userId = req.headers['userId'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const tokenValue = token.split(' ')[1];

  jwt.verify(tokenValue, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        req.user = decoded;

        next();
      }

      return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }

    req.user = decoded;
    if(!verifyUser(tokenValue,userId)){
      return res.status(403).json({ message: 'Unauthorized, invalid token' });
    }
    
    next();
  });
};

export {verifyJWT};
