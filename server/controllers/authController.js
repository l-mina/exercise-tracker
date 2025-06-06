import { sql } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const registerUser = async(req,res) => {

    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!name || !email || !password ) {
        return res.status(500).json({ success: false, message: "All fields are required" });
    };

    try {
        const newUser = await sql
        `
            INSERT INTO users (name,email,password)
            VALUES (${name},${email},${hashedPassword})
            RETURNING *
        `;
        //console.log("User was added ", newUser[0].id);

        // create a token
        const token = jwt.sign({ id: newUser[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ success: true, data: newUser[0], token});
    } catch (error) {
        console.log("Error in createUser function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        {
            id : user.id,

            name: user.name,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

export const loginUser = async(req,res) => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json({success:false, message:"All fields are required"});
    }
    try {
        const user = await sql 
        `
            SELECT * FROM users WHERE email=${email}
        `;

        if (user.length === 0){
            return res.status(404).json({ success: false, message: "User not found" });
        };
        
        const passwordIsValid = bcrypt.compareSync(password,user[0].password);
        
        if (!passwordIsValid){
            return res.status(401).json({ success: false, message: "Invalid password" });
        };

        const { accessToken, refreshToken } = generateTokens(user[0]);
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
    
        res.status(200).json({ success: true, data: user, accessToken });

    } catch (error) {
        console.log("Error in loginUser function ",error);
        res.status(503).json({ success: false, message: "Internal Server Error" });
    }
};

export const refreshAccess = async(req,res) => {

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({ success: false, message:"No refresh token provided" });
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = { id: decoded.userId }
        const { newAccessToken, newRefreshToken } = generateTokens(user);

        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};



export const verifyToken = async(req,res) => {
    const accessToken = req.cookies.accessToken;

    if(!accessToken) return res.status(401).json({ success: false, message:"No access token provided" });
    try {
        jwt.verify(accessToken, process.env.JWT_SECRET, (err,decoded) => {
            req.user = decoded;
            return res.status(200).json({ data:{name:req.user.name, email:req.user.email}});
        });
    } catch (error) {
        console.log("Error in verifyToken ", error);
    }
};

export const logout = async(req,res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, message:"Logged out successfully" });
};
