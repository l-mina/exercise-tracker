import { sql } from "../config/db.js";

export const getExercises = async(req,res) => {
    const { user_id } = req.params;
    try {
        const exercises = await sql `
            SELECT * FROM exercises WHERE user_id=${user_id}
        `;
        console.log("fetched exercises ", exercises);
        res.status(200).json({ success: true, data: exercises });
    } catch (error) {
        console.log("Error in getExercises function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getExercise = async(req,res) => {
    try {
        const exercise = await sql `
            SELECT * FROM exercises WHERE id=${id}
        `;
        res.status(200).json({ success: true, data: exercise[0] });
    } catch (error) {
        console.log("Error in getExercise function ",error);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
};

export const newExercise = async(req,res) => {
    const { user_id, exercises } = req.body;
    try {
        const exercise = await sql
        `
            INSERT INTO userExercises (user_id, exercise)
            VALUES (${user_id},${exercises})
            RETURNING *

        `;
    } catch (error) {
        console.log("Error in newExercise function ",error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};