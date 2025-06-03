import { sql } from "../config/db.js";

// Exercise catalog
export const getExercises = async(req,res) => {
    try {
        const exercises = await sql
        `
            SELECT * FROM exercises ORDER BY NAME
        `;
        console.log("Fetched exercises: ", exercises);
        res.status(200).json({ success: true, data: exercises });
    } catch (error) {
        console.log("Error in getExercises function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

