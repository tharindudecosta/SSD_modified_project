import jwt from 'jsonwebtoken';

const {JWT_SECRET} = process.env;

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

    next();
  });
};

export {verifyJWT};
