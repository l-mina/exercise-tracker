import { sql } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import parseCookies from "../utils/parseCookies.js";

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
    HttpOnly: true,
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
        //res.cookie('refreshToken', refreshToken, cookieOptions);
        res.setHeader('Set-Cookie',`refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`);
        
        res.status(200).json({success: true, data: user, accessToken})
    } catch (error) {
        console.log("Error in loginUser function ",error);
        res.status(503).json({ success: false, message: "Internal Server Error " });
    }
};

export const refreshAccess = async(req,res) => {
    const cookies = parseCookies(req.headers.cookie);
    const refreshToken = cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({ success: false, message:"No refresh token provided" });
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const { id } = decoded;
        const newAccessToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        //res.setHeader('Set-Cookie', `refreshToken=${newAccessToken}; HttpOnly; Path=/api/auth/; Max-Age=604800; SameSite=Strict`);
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};

export const logout = async(req,res) => {
    res.setHeader('Set-Cookie', 'refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
    res.status(200).json({ success: true, message:"Logged out successfully" });
};

/*
refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ3OTY2ODM5LCJleHAiOjE3NDg1NzE2Mzl9.wKFIvJDK8mTFtmU5LxOjGn84wxxNiv7VeuqGJXf3_v8
refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ3OTY3MzIxLCJleHAiOjE3NDg1NzIxMjF9.r4bPjrfETD2zi0ybbE4QQQJspJcnIWfmDITlH1yMMuE; HttpOnly; Path=/api/auth/; Max-Age=604800; SameSite=Strict
refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ3OTY3Mzk4LCJleHAiOjE3NDg1NzIxOTh9.BfJksFLErHErdxYd9xEv1IZCZQLoifpS9kPqeVezx2w; HttpOnly; Path=/api/auth/; Max-Age=604800; SameSite=Strict
*/