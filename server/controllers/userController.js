import { sql } from "../config/db.js";

export const getUsers = async(req,res) => {
    try {
        const users = await sql
        `
            SELECT * FROM users
            ORDER BY created_at DESC
        `;
        console.log("fetched users ",users);
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("Error in getUsers function ",error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getUser = async(req,res) => {

    const { id } = req.params;

    try {
        const user = await sql
        `
            SELECT * FROM users WHERE id=${id}
        `;
        console.log("fetched user ",user[0]);
        res.status(200).json({ success: true, data: user[0] });
    } catch (error) {
        console.log("Error in getUser function ",error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const createUser = async(req,res) => {

    const { name, email, password } = req.params;
    if (!name || !email || !password ) {
        return req.status(500).json({ success: false, message: "All fields are required" });
    };
    try {
        const newUser = await sql
        `
            INSERT INTO users (name,email,password)
            VALUES (${name},${email},${password})
            RETURNING *
        `;
        console.log("User was added ", newUser);
        res.status(201).json({ success: true, data: newUser[0] });
    } catch (error) {
        console.log("Error in createUser function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateUser = async(req,res) => {

    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const updateUser = await sql
        `
            UPDATE users
            SET name=${name}, email=${email}, password=${password}
            WHERE id=${id}
            RETURNING *
        `;
        if (updateUser.length === 0){
            return res.status(404).json({ success: false, message: "User not found" });
        };
        res.status(200).json({ success: true, data: updateUser[0] });
    } catch (error) {
        console.log("Error in updateUser function ",error);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
};

export const deleteUser = async(req,res) => {
    
    const { id } = req.params;
    
    try {
        const deletedUser = await sql  
        `
            DELETE FROM users WHERE id=${id}
            RETURNING *
        `;
        console.log("User was deleted ", deletedUser);
        req.status(200).json({ success: true, data: deleteUser[0] });
    } catch (error) {
        console.log("Error in deleteUser function ", error);
        req.status(500).json({ success: false, message: "Internal Server Error "});
    }
};