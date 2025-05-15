import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = async(req, res, next) => {
    const token = req.headers['authorization'];
    if (!token){
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    jwt.verify(token,process.env.JWT_SECRET, (error, decoded)=>{
        if(error){
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        req.userId = decoded.id;
        next();
    });
}