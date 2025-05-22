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

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
        console.log(user);
        const passwordIsValid = bcrypt.compareSync(password,user[0].password);
        
        if (!passwordIsValid){
            return res.status(401).json({ success: false, message: "Invalid password" });
        };

        const accessToken = jwt.sign({ id : user[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id : user[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, cookieOptions);
        res.status(200).json({success: true, data: user, accessToken})
    } catch (error) {
        console.log("Error in loginUser function ",error);
        res.status(503).json({ success: false, message: "Internal Server Error " });
    }
};

export const refreshAccess = async(req,res) => {
    const { id }= req.params;
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({ success: false, message:"No refresh token provided" });
    jwt.verify(refreshToken, process.env.JWT_SECRET, (error, user) => {
        if(error) return res.status(403).json({ success: false, message:"Invalid refresh token" });
        const newAccessToken = jwt.sign({ id: id}, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({ success: true, accessToken: newAccessToken})
    })
};

export const logout = async(req,res) => {
    res.cookie('refreshToken','',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        expires: new Date(0), // expire immediately
    });
    res.status(200).json({ success: true, message:"Logged out successfully" });
};