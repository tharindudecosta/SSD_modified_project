import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const loginGoogleAuth = (req, res) => {

    const googleAuth = {
        userId:"googleID0001"
      };
      const token = jwt.sign({ userId: googleAuth._id }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ doc: googleAuth, token: `Bearer ${token}` });

};



export { loginGoogleAuth };
